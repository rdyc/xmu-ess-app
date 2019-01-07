import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IRole } from '@lookup/classes/response';
import { RoleField } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupRoleSumarry } from '../detail/shared/LookupRoleSummary';
import { ILookupRoleListFilterResult, LookupRoleListFilter } from './LookupRoleListFilter';

interface IOwnOption {

}

interface IOwnState extends ILookupRoleListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IRole>;
  isFilterOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setConfig: StateHandler<IOwnState>;
  setShouldUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILookupRoleListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupRole
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.lookupRoleState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <LookupRoleListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            companyUid: props.companyUid
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IRole>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ILookupRoleListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupRoleListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupRoleState.all;
    const { loadAllRequest } = this.props.lookupRoleDispatch;

    const config: IListConfig<IRole> = {
      // page
      page: {
        uid: AppMenu.Lookup,
        parentUid: AppMenu.LookupRole,
        title: this.props.intl.formatMessage(lookupMessage.role.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.role.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(RoleField)
        .map(key => ({
          value: key,
          name: RoleField[key]
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
      showActionCentre: false,

      // toolbar controls
      toolbarControls: (callback: ListHandler) => [
        {
          icon: AddCircleIcon,
          onClick: () => {
            this.props.history.push('/lookup/roles/form');
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: params.page,
                size: params.size,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: IRole, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.name,
        tertiary: item.company ? item.company.name : 'N/A',
        quaternary: item.description ? item.description : 'N/A',
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IRole) => (
        <LookupRoleSumarry data={item} />
      ),

      // action component
      actionComponent: (item: IRole, callback: ListHandler) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/roles/form`, { uid: item.uid, companyUid: item.companyUid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/roles/${item.uid}`, { companyUid: item.companyUid })}
          >
            <FormattedMessage {...layoutMessage.action.details} />
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
            return this.props.companyUid !== undefined;
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
      this.props.companyUid !== nextProps.companyUid
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const LookupRoleList = compose(
  setDisplayName('LookupRoleList'),
  withUser,
  withLookupRole,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);