import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { HierarchyField } from '@organization/classes/types';
import { OrganizationHierarchySummary } from '@organization/components/hierarchy/detail/shared/OrganizationHierarchySummary';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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

import { IOrganizationHierarchyListFilterResult, OrganizationHierarchyListFilter } from './OrganizationHierarchyListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IOrganizationHierarchyListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IHierarchy>;
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
  handleFilterApplied: (filter: IOrganizationHierarchyListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithOrganizationHierarchy
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.organizationHierarchyState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <OrganizationHierarchyListFilter 
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
  isFilterOpen: false,
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IHierarchy>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IOrganizationHierarchyListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IOrganizationHierarchyListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.organizationHierarchyState.all;
    const { loadAllRequest } = this.props.organizationHierarchyDispatch;

    const config: IListConfig<IHierarchy> = {
      // page
      page: {
        uid: AppMenu.LookupApprovalHierarchy,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(organizationMessage.hierarchy.page.listTitle),
        description: this.props.intl.formatMessage(organizationMessage.hierarchy.page.listSubHeader),
      },
      
      // top bar
      fields: Object.keys(HierarchyField).map(key => ({ 
        value: key, 
        name: HierarchyField[key] 
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
            this.props.history.push('/organization/hierarchy/form'); 
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
                direction: params.direction,
                orderBy: params.orderBy,
                page: params.page,
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
      onBind: (item: IHierarchy, index: number) => ({
        key: item.uid,
        primary: item.uid,
        secondary: item.name,
        tertiary: item.company && item.company.name || 'N/A',
        quaternary: item.inactiveDate && this.props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
        quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IHierarchy) => ( 
        <OrganizationHierarchySummary data={item} />
      ),

      // action component
      actionComponent: (item: IHierarchy, callback: ListHandler) => (
        <React.Fragment>
          {
            <Button 
              size="small"
              onClick={() => this.props.history.push(`/organization/hierarchy/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/organization/hierarchy/${item.uid}`)}
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
            return this.props.companyUid !== undefined ;
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

export const OrganizationHierarchyList = compose(
  setDisplayName('OrganizationHierarchyList'),
  withUser,
  withOrganizationHierarchy,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);