import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
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

import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import { TravelSummary } from '@travel/components/request/detail/shared/TravelSummary';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { ITravelApprovalListFilterResult, TravelApprovalListFilter } from './TravelApprovalListFilter';

interface IOwnOption {

}

interface IOwnState extends ITravelApprovalListFilterResult {
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
  handleFilterApplied: (filter: ITravelApprovalListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTravelApproval
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.travelApprovalState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <TravelApprovalListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            statusType: props.statusType,
            status: props.status,
            isNotify: props.isNotify,
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
  status: props.location.state && props.location.state.status,
  isNotify: props.location.state && props.location.state.isNotify
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
  setFilterApplied: (prevState: IOwnState) => (filter: ITravelApprovalListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ITravelApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.travelApprovalState.all;
    const { loadAllRequest } = this.props.travelApprovalDispatch;

    const config: IListConfig<ITravelRequest> = {
      // page
      page: {
        uid: AppMenu.TravelApproval,
        parentUid: AppMenu.Travel,
        title: this.props.intl.formatMessage(travelMessage.requestApproval.page.listTitle),
        description: this.props.intl.formatMessage(travelMessage.requestApproval.page.listSubHeader),
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

        if (request && request.filter && request.filter.query) {
          result = request.filter.query.find ? true : false;
        }

        return result;
      },

      // action centre
      showActionCentre: false,

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
                statusType: this.props.statusType,
                status: this.props.status,
                isNotify: this.props.isNotify,
                query: {
                  find: params.find,
                  findBy: params.findBy,
                  orderBy: params.orderBy,
                  direction: params.direction,
                  page: params.page,
                  size: params.size,
                }
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
        secondary: item.customer && item.customer.name || item.customerUid,
        tertiary: item.objective ? item.objective : 'N/A',
        quaternary: this.props.intl.formatNumber(item.total, GlobalFormat.CurrencyDefault) || '-',
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
          <Button
            size="small"
            onClick={() => this.props.history.push(`/travel/approvals/${item.uid}`)}
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
              this.props.statusType !== undefined ||
              this.props.status !== undefined ||
              this.props.isNotify === true;
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
      this.props.statusType !== nextProps.statusType ||
      this.props.status !== nextProps.status ||
      this.props.isNotify !== nextProps.isNotify
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const TravelApprovalList = compose(
  setDisplayName('TravelApprovalList'),
  withUser,
  withTravelApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);