import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IEmployee } from '@account/classes/response';
import { AccountEmployeeField } from '@account/classes/types';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalFormat } from '@layout/types';
import { AccountEmployeeFilter, IAccountEmployeeFilterResult } from './AccountEmployeeFilter';
import { AccountEmployeeSummary } from './AccountEmployeeSummary';

interface OwnState extends IAccountEmployeeFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IEmployee>;
  isFilterOpen: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setConfig: StateHandler<OwnState>;
  setShouldUpdate: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

interface OwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: any) => void;
}

type AllProps
  = OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithUser
  & WithAccountEmployee
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
  {
    props.config &&
    <ListPage
      config={props.config}
      source={props.accountEmployeeState.all}
      loadDataWhen={props.shouldUpdate}
    >
      <AccountEmployeeFilter
        isOpen={props.isFilterOpen}
        initialProps={{
          companyUids: props.companyUids,
          roleUids: props.roleUids
        }}
        onClose={props.handleFilterVisibility}
        onApply={props.handleFilterApplied}
      />
    </ListPage>
  }
</React.Fragment>
);

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => {
  const { request } = props.accountEmployeeState.all;

  const state: OwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // fill from previous request if any
  if (request && request.filter) {
    state.companyUids = request.filter.companyUids;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  
  setConfig: () => (config: IListConfig<IEmployee>): Partial<OwnState> => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => (): Partial<OwnState> => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: IAccountEmployeeFilterResult): Partial<OwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IAccountEmployeeFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.accountEmployeeState.all;
    const { loadAllRequest } = this.props.accountEmployeeDispatch;

    const config: IListConfig<IEmployee> = {
      // page
      page: {
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(accountMessage.shared.page.listTitle, { state: 'Employee'}),
        description: this.props.intl.formatMessage(accountMessage.shared.page.listSubHeader),
      },

      // top bar
      fields: Object.keys(AccountEmployeeField).map(key => ({
        value: key,
        name: AccountEmployeeField[key]
      })),

      // searching
      hasSearching: true,
      searchStatus: (): boolean => {
        let result: boolean = false;

        if (request && request.filter && request.filter.find) {
          result = request.filter.find ? true : false;
        }
    
        return result;
      },

      // action centre
      showActionCentre: true,

      // toolbar controls
      toolbarControls: () => [
        {
          icon: AddCircleIcon,
          onClick: () => { 
            this.props.history.push('/account/employee/form'); 
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when request, response are empty and or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              filter: {
                companyUids: this.props.companyUids,
                roleUids: this.props.companyUids ? this.props.roleUids : undefined,
                positionUids: undefined,
                direction: params.direction,
                orderBy: params.orderBy,
                page: resetPage ? 1 : params.page,
                size: params.size,
                find: params.find,
                findBy: params.findBy,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IEmployee, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.company ? item.company.name : 'N/A',
        tertiary: item.fullName,
        quaternary: this.props.intl.formatDate(item.joinDate, GlobalFormat.Date),
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IEmployee) => ( 
        <AccountEmployeeSummary data={item} />
      ),

      // action component
      actionComponent: (item: IEmployee) => (
        <React.Fragment>
          <Button 
            // disabled
            size="small"
            onClick={() => this.props.history.push(`/account/employee/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify}/>
          </Button>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/account/employee/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      ),

      // additional controls
      additionalControls: [
        {
          id: 'option-filter',
          title: this.props.intl.formatMessage(layoutMessage.tooltip.filter),
          icon: TuneIcon,
          showBadgeWhen: () => {
            return this.props.companyUids !== undefined || this.props.roleUids !== undefined;
          },
          onClick: this.props.handleFilterVisibility
        }
      ]
    };

    this.props.setConfig(config);
  },
  componentDidUpdate(nextProps: AllProps) {
    // track any changes in filter props
    if (
      this.props.companyUids !== nextProps.companyUids ||
      this.props.roleUids !== nextProps.roleUids
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const AccountEmployeeListView = compose(
  setDisplayName('AccountEmployeeListView'),
  withUser,
  withAccountEmployee,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);