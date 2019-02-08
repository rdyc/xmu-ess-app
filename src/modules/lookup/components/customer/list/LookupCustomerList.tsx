import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomer } from '@lookup/classes/response';
import { LookupCustomerField } from '@lookup/classes/types/customer/LookupCustomerField';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TuneIcon from '@material-ui/icons/Tune';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupCustomerSummary } from '../detail/shared/LookupCustomerSummary';
import { ILookupCustomerListFilterResult, LookupCustomerListFilter } from './LookupCustomerListFilter';

interface IOwnOption {

}

interface IOwnState extends ILookupCustomerListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ICustomer>;
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
  handleFilterApplied: (filter: ILookupCustomerListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupCustomer
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.lookupCustomerState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <LookupCustomerListFilter
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

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.lookupCustomerState.all;
  
  // default state
  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false
  };

  if (request && request.filter) {
    state.companyUid = request.filter.companyUid;
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<ICustomer>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: ILookupCustomerListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ILookupCustomerListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.lookupCustomerState.all;
    const { loadAllRequest } = this.props.lookupCustomerDispatch;

    const config: IListConfig<ICustomer> = {
      // page
      page: {
        uid: AppMenu.LookupCustomer,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.customer.page.listTitle),
        description: this.props.intl.formatMessage(lookupMessage.customer.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(LookupCustomerField)
        .map(key => ({
          value: key,
          name: LookupCustomerField[key]
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
            this.props.history.push('/lookup/customer/form');
          }
        }
      ],

      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean, resetPage?: boolean) => {
        // when user is set and not loading
        if (user && !isLoading) {
          // when response are empty or force reloading
          if (!request || !response || forceReload) {
            loadAllRequest({
              filter: {
                companyUid: this.props.companyUid,
                find: params.find,
                findBy: params.findBy,
                orderBy: params.orderBy,
                direction: params.direction,
                page: resetPage ? 1 : params.page,
                size: params.size,
              }
            });
          } else {
            // just take data from previous response
            callback.handleResponse(response);
          }
        }
      },
      onBind: (item: ICustomer, index: number) => ({
        key: index,
        primary: item.name,
        secondary: item.email ? item.email : 'N/A',
        tertiary: item.phone ? item.phone : (item.phoneAdditional ? item.phoneAdditional : 'N/A'),
        quaternary: item.company && item.company.name || item.companyUid,
        quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ICustomer) => (
        <LookupCustomerSummary data={item} />
      ),

      // action component
      actionComponent: (item: ICustomer, callback: ListHandler) => (
        <React.Fragment>
          {
            <Button
              size="small"
              onClick={() => this.props.history.push(`/lookup/customer/form`, { uid: item.uid, companyUid: item.companyUid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }

          <Button
            size="small"
            onClick={() => this.props.history.push(`/lookup/customer/${item.uid}`, { companyUid: item.companyUid })}
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

export const LookupCustomerList = compose(
  setDisplayName('LookupCustomerList'),
  withUser,
  withLookupCustomer,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);
