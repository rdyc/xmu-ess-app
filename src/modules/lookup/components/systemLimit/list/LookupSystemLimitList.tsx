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

import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitField } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { ILookupSystemLimitFilterResult, LookupSystemLimitFilter } from './LookupSystemLimitFilter';
import { LookupSystemLimitSummary } from './LookupSystemLimitSummary';

interface OwnOption {
  
}

interface OwnState extends ILookupSystemLimitFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ISystemLimit>;
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
  & WithLookupSystemLimit
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.systemLimitState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <LookupSystemLimitFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            companyUid: props.companyUid,
            categoryType: props.categoryType
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,
});

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevState: OwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  
  setConfig: () => (config: IListConfig<ISystemLimit>) => ({
    config
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: () => (filter: ILookupSystemLimitFilterResult) => ({
    ...filter,
    isFilterOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, OwnHandler> = {
  handleFilterVisibility: (props: AllProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupSystemLimitFilterResult) => {
    props.setFilterApplied(filter);
  }
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.systemLimitState.all;
    const { loadAllRequest } = this.props.systemLimitDispatch;

    const config: IListConfig<ISystemLimit> = {
      // page
      page: {
        uid: AppMenu.LookupSystemLimit,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.systemLimit.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.systemLimit.page.listSubHeader),
      },

      // top bar
      fields: Object.keys(SystemLimitField).map(key => ({
        value: key,
        name: SystemLimitField[key]
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
            this.props.history.push('/lookup/systemlimits/form'); 
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => {
        // when user is set and not loading
        if (user && !isLoading) {
          if (!response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                categoryType: this.props.categoryType,
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
      onBind: (item: ISystemLimit, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.company.name,
        tertiary: item.category ? item.category.value : 'N/A',
        quaternary: item.days.toString(),
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ISystemLimit) => ( 
        <LookupSystemLimitSummary data={item} />
      ),

      // action component
      actionComponent: (item: ISystemLimit) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/lookup/systemlimits/${item.uid}`, { companyUid: item.companyUid })}
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
            return this.props.companyUid !== undefined || this.props.categoryType !== undefined;
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
      this.props.companyUid !== nextProps.companyUid ||
      this.props.categoryType !== nextProps.categoryType
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const LookupSystemLimitList = compose(
  setDisplayName('LookupSystemLimitList'),
  withUser,
  withLookupSystemLimit,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);