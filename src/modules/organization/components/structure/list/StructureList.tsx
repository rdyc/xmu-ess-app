import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune'; 
import { IStructure } from '@organization/classes/response/structure';
import { StructureField } from '@organization/classes/types';
import { StructureSummary } from '@organization/components/structure/shared/StructureSummary';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
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

import { IStructureListFilterResult, StructureListFilter } from './StructureListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IStructureListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IStructure>;
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
  handleFilterApplied: (filter: IStructureListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithOrganizationStructure
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,
  companyUid: props.location.state && props.location.state.companyUid,
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IStructure>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState, props: AllProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IStructureListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IStructureListFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.organizationStructureState.all;
    const { loadAllRequest } = this.props.organizationStructureDispatch;

    const config: IListConfig<IStructure> = {
      // page
      page: {
        uid: AppMenu.LookupOrganizationStructure,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(organizationMessage.structure.page.listTitle),
        // description: this.props.intl.formatMessage(organizationMessage.structure.page.listSubHeader),
        description: '',
      },
      
      // top bar
      fields: Object.keys(StructureField)
        .map(key => ({ 
          value: key, 
          name: StructureField[key] 
        })),
    
      // searching
      hasSearching: true,
      searchStatus: () => {
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
            this.props.history.push('/organization/structure/form');
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
                companyUid: user.company.uid,
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
      onBind: (item: IStructure, index: number) => ({
        key: item.uid,
        primary: item.uid,
        secondary: item.description || '-',
        tertiary: item.company && item.company.name || 'N/A',
        quaternary: item.inactiveDate && this.props.intl.formatDate(item.inactiveDate, GlobalFormat.Date) || 'N/A',
        quinary: item.changes && (item.changes.updated && item.changes.updated.fullName || item.changes.created && item.changes.created.fullName) || '?',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),
    
      // summary component
      summaryComponent: (item: IStructure) => ( 
        <StructureSummary data={item} />
      ),
    
      // action component
      actionComponent: (item: IStructure, callback: ListHandler) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => this.props.history.push(`/organization/structure/form`, { structureUid: item.uid, companyUid: item.companyUid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            onClick={() => this.props.history.push(`/organization/structure/${item.uid}`, { companyUid: item.companyUid })}
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

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.organizationStructureState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <StructureListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            companyUid: props.companyUid,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

export const StructureList = compose<AllProps, IOwnOption>(
  setDisplayName('StructureList'),
  withUser,
  withOrganizationStructure,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);