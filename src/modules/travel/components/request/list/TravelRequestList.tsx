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

import { isModuleRequestEditable } from '@organization/helper/isModuleRequestEditable';
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelSummary } from '../detail/shared/TravelSummary';
import { ITravelRequestListFilterResult, TravelRequestListFilter } from './TravelRequestListFilter';

interface IOwnOption {

}

interface IOwnState extends ITravelRequestListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ITravelRequest>;
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
  handleFilterApplied: (filter: ITravelRequestListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTravelRequest
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.travelRequestState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <TravelRequestListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            projectUid: props.projectUid,
            statusType: props.statusType,
            isRejected: props.isRejected,
            isSettlement: props.isSettlement
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

  // fill partial props from location state to handle redirection from dashboard notif
  isRejected: props.location.state && props.location.state.isRejected,
  isSettlement: props.location.state && props.location.state.isSettlement
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<ITravelRequest>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ITravelRequestListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ITravelRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.travelRequestState.all;
    const { loadAllRequest } = this.props.travelRequestDispatch;

    const config: IListConfig<ITravelRequest> = {
      // page
      page: {
        uid: AppMenu.TravelRequest,
        parentUid: AppMenu.Travel,
        title: this.props.intl.formatMessage(travelMessage.request.page.listTitle),
        description: this.props.intl.formatMessage(travelMessage.request.page.listSubHeader)
      },

      // top bar
      fields: Object.keys(TravelRequestField)
        .map(key => ({
          value: key,
          name: TravelRequestField[key]
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
            this.props.history.push('/travel/requests/form');
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
                positionUid: user.position.uid,
                customerUid: this.props.customerUid,
                projectUid: this.props.projectUid,
                statusType: this.props.statusType,
                isRejected: this.props.isRejected,
                isSettlement: this.props.isSettlement,
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
      onBind: (item: ITravelRequest, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.projectUid,
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: item.total && this.props.intl.formatNumber(item.total, GlobalFormat.CurrencyDefault) || '-',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ITravelRequest) => (
        <TravelSummary data={item} />
      ),

      // action component
      actionComponent: (item: ITravelRequest, callback: ListHandler) => (
        <React.Fragment>
          {
            isModuleRequestEditable(item.statusType) &&
            <Button
              size="small"
              onClick={() => this.props.history.push(`/travel/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }
          <Button
            size="small"
            onClick={() => this.props.history.push(`/travel/requests/${item.uid}`)}
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
            return this.props.customerUid !== undefined ||
              this.props.projectUid !== undefined || 
              this.props.statusType !== undefined ||
              this.props.isRejected === true ||
              this.props.isSettlement === true;
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
      this.props.customerUid !== nextProps.customerUid ||
      this.props.projectUid !== nextProps.projectUid ||
      this.props.statusType !== nextProps.statusType ||
      this.props.isRejected !== nextProps.isRejected ||
      this.props.isSettlement !== nextProps.isSettlement
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const TravelRequestList = compose(
  setDisplayName('TravelRequestList'),
  withUser,
  withTravelRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);