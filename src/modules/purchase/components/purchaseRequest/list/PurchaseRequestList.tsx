import AppMenu from '@constants/AppMenu';
import { IListConfig, ListDataProps, ListHandler, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField } from '@purchase/classes/types';
import { PurchaseSummary } from '@purchase/components/purchaseRequest/detail/shared/PurchaseSummary';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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

import { WorkflowStatusType } from '@common/classes/types';
import { isRequestEditable } from '@purchase/helper';
import { IPurchaseRequestListFilterResult, PurchaseRequestListFilter } from './PurchaseRequestListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IPurchaseRequestListFilterResult {
  companyUid?: string;
  shouldUpdate: boolean;
  config?: IListConfig<IPurchase>;
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
  handleFilterApplied: (filter: IPurchaseRequestListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithPurchaseRequest
  & InjectedIntlProps
  & RouteComponentProps;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,
  companyUid:  props.userState.user && props.userState.user.company && props.userState.user.company.uid,

  // fill partial props from location state to handle redirection from dashboard notif
  statusType: props.location.state && props.location.state.statusType,
  isSettlement: props.location.state && props.location.state.isSettlement,
  isRejected: props.location.state && props.location.state.isRejected 
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IPurchase>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState, props: AllProps) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IPurchaseRequestListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IPurchaseRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.purchaseRequestState.all;
    const { loadAllRequest } = this.props.purchaseRequestDispatch;

    const config: IListConfig<IPurchase> = {
      // page
      page: {
        uid: AppMenu.PurchaseRequest,
        parentUid: AppMenu.Purchase,
        title: this.props.intl.formatMessage(purchaseMessage.request.pages.listTitle),
        description: this.props.intl.formatMessage(purchaseMessage.request.pages.listSubHeader),
      },
      
      // top bar
      fields: Object.keys(PurchaseField)
        .map(key => ({ 
          value: key, 
          name: PurchaseField[key] 
        })),
      // fieldTranslator: purchaseRequestFieldTranslator,
    
      // searching
      hasSearching: true,
      searchStatus: () => {
        let result: boolean = false;
    
        if (request && request.filter && request.filter.query && request.filter.query.find) {
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
                isSettlement: this.props.isSettlement,
                isRejected: this.props.isRejected,
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
      onBind: (item: IPurchase, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.projectUid || item.project && item.project.name || '',
        tertiary: item.customer && item.customer.name || item.customerUid || '',
        quaternary: item.requestIDR && `${this.props.intl.formatNumber(item.requestIDR, GlobalFormat.CurrencyDefault)}` || '',
        quinary: item.status && item.status.value || item.statusType || '',
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),
    
      // summary component
      summaryComponent: (item: IPurchase) => ( 
        <PurchaseSummary data={item} />
      ),
    
      // action component
      actionComponent: (item: IPurchase, callback: ListHandler) => (
        <React.Fragment>
          {
            isRequestEditable(item.statusType ? item.statusType : '') &&
            <Button
              size="small"
              onClick={() => this.props.history.push(`/purchase/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify} />
            </Button>
          }
          {
            WorkflowStatusType.Approved === (item.statusType) &&
            <Button
              size="small"
              onClick={() => this.props.history.push(`/purchase/settlement/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...purchaseMessage.action.settle} />
            </Button>
          }
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/purchase/requests/${item.uid}`)}
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
            return this.props.customerUid !== undefined ||
              this.props.statusType !== undefined ||
              this.props.isSettlement === true ||
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
      this.props.isRejected !== nextProps.isRejected ||
      this.props.isSettlement !== nextProps.isSettlement
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
        source={props.purchaseRequestState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <PurchaseRequestListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            statusType: props.statusType,
            isSettlement: props.isSettlement,
            isRejected: props.isRejected,
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
          companyUid={props.companyUid}
        />
      </ListPage>
    }
  </React.Fragment>
);

export const PurchaseRequestList = compose<AllProps, IOwnOption>(
  setDisplayName('PurchaseRequestList'),
  withUser,
  withPurchaseRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);