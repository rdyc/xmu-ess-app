import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
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

import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField } from '@mileage/classes/types';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { MileageSummary } from '../shared/MileageSummary';
import { IMileageRequestListFilterResult, MileageRequestListFilter } from './MileageRequestListFilter';

interface OwnOption {
  
}

interface OwnState extends IMileageRequestListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IMileageRequest>;
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
  & OwnOption
  & OwnHandler
  & OwnStateUpdater
  & WithUser
  & WithMileageRequest
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.mileageRequestState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <MileageRequestListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            year: props.year,
            month: props.month,
            status: props.status,
            statusType: props.statusType,
            isRejected: props.isRejected
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => {
  const { request } = props.mileageRequestState.all;

  const state: OwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  // When location state are present (ex: redirection from dashboard) then don't use redux state
  if (props.location.state) {
    state.isRejected = props.location.state.isRejected;
  } else {
    // fill from previous request if any
    if (request && request.filter) {
      state.year = request.filter.year,
      state.month = request.filter.month,
      state.statusType = request.filter.statusType,
      state.isRejected = request.filter.isRejected;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (state: OwnState) => (): Partial<OwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: OwnState) => (config: IListConfig<IMileageRequest>): Partial<OwnState> => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => (): Partial<OwnState> => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (state: OwnState) => (filter: IMileageRequestListFilterResult): Partial<OwnState> => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IMileageRequestListFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.mileageRequestState.all;
    const { loadAllRequest } = this.props.mileageRequestDispatch;

    const config: IListConfig<IMileageRequest> = {
      // page
      page: {
        uid: AppMenu.MileageRequest,
        parentUid: AppMenu.Mileage,
        title: this.props.intl.formatMessage(mileageMessage.request.page.listTitle),
        description: this.props.intl.formatMessage(mileageMessage.request.page.listSubHeader),
      },

      // top bar
      fields: Object.keys(MileageRequestField).map(key => ({
        value: key,
        name: MileageRequestField[key]
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

      // toolbar controls
      toolbarControls: () => [
        {
          icon: AddCircleIcon,
          onClick: () => { 
            this.props.history.push('/mileage/requests/form'); 
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
                direction: params.direction,
                orderBy: params.orderBy,
                page: resetPage ? 1 : params.page,
                size: params.size,
                companyUid: user.company.uid,
                positionUid: user.position.uid,
                find: params.find,
                findBy: params.findBy,
                month: this.props.month,
                year: this.props.year,
                statusType: this.props.statusType,
                status: this.props.status,
                isRejected : this.props.isRejected
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IMileageRequest, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: this.props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
        tertiary: item.employee && item.employee.fullName || item.employeeUid,
        quaternary: this.props.intl.formatNumber(item.amount, GlobalFormat.CurrencyDefault),
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'    
      }),

      // summary component
      summaryComponent: (item: IMileageRequest) => ( 
        <MileageSummary data={item} />
      ),

      // action component
      actionComponent: (item: IMileageRequest) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/mileage/requests/${item.uid}`)}
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
            return this.props.year !== undefined ||
              this.props.month !== undefined ||
              this.props.statusType !== undefined ||
              this.props.status !== undefined ||
              this.props.isRejected === true;
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
      this.props.year !== nextProps.year ||
      this.props.month !== nextProps.month ||
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isRejected !== nextProps.isRejected
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const MileageRequestList = compose(
  setDisplayName('MileageRequestList'),
  withUser,
  withMileageRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);