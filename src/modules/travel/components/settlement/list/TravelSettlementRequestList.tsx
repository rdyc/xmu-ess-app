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

import { isModuleRequestEditable } from '@organization/helper/isModuleRequestEditable';
import { ITravelSettlement } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelSummarySettlement } from '../detail/shared/TravelSummarySettlement';
import { ITravelSettlementListFilterResult, TravelSettlementListFilter } from './TravelSettlementListFilter';

interface IOwnOption {

}

interface IOwnState extends ITravelSettlementListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<ITravelSettlement>;
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
  handleFilterApplied: (filter: ITravelSettlementListFilterResult) => void;
}

type AllProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithTravelSettlement
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.travelSettlementState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <TravelSettlementListFilter
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            statusType: props.statusType,
            isRejected: props.isRejected,
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
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<ITravelSettlement>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: ITravelSettlementListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: ITravelSettlementListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.travelSettlementState.all;
    const { loadAllRequest } = this.props.travelSettlementDispatch;

    const config: IListConfig<ITravelSettlement> = {
      // page
      page: {
        uid: AppMenu.TravelSettlementRequest,
        parentUid: AppMenu.Travel,
        title: this.props.intl.formatMessage(travelMessage.settlement.page.listTitle),
        description: this.props.intl.formatMessage(travelMessage.settlement.page.listSubHeader),
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
                isRejected: this.props.isRejected,
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
      onBind: (item: ITravelSettlement, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.customer && item.customer.name || item.customerUid,
        tertiary: item.objective ? item.objective : 'N/A',
        quaternary: this.props.intl.formatNumber(item.total, GlobalFormat.CurrencyDefault) || '-',
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: ITravelSettlement) => (
        <TravelSummarySettlement data={item} />
      ),

      // action component
      actionComponent: (item: ITravelSettlement, callback: ListHandler) => (
        <React.Fragment>
          {
            isModuleRequestEditable(item.statusType) &&
            <Button
              size="small"
              onClick={() => this.props.history.push(`/travel/settlement/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }

          <Button
            size="small"
            onClick={() => this.props.history.push(`/travel/settlement/requests/${item.uid}`)}
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
      this.props.customerUid !== nextProps.customerUid ||
      this.props.statusType !== nextProps.statusType ||
      this.props.isRejected !== nextProps.isRejected
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const TravelSettlementRequestList = compose(
  setDisplayName('TravelSettlementList'),
  withUser,
  withTravelSettlement,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);