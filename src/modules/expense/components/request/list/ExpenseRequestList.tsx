import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseField } from '@expense/classes/types';
import { ExpenseSummary } from '@expense/components/request/detail/shared/ExpenseSummary';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
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
import { ExpenseRequestListFilter, IExpenseRequestListFilterResult } from './ExpenseRequestListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IExpenseRequestListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IExpense>;
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
  handleFilterApplied: (filter: IExpenseRequestListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithExpenseRequest
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.expenseRequestState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ExpenseRequestListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            expenseType: props.expenseType,
            statusType: props.statusType,
            start: props.start,
            end: props.end,
            status: props.status,
            isRejected: props.isRejected
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
  isRejected: props.location.state && props.location.state.isRejected
});

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (prevState: IOwnState) => () => ({
    shouldUpdate: !prevState.shouldUpdate
  }),
  setConfig: (prevState: IOwnState) => (config: IListConfig<IExpense>) => ({
    config
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),
  setFilterApplied: (prevState: IOwnState) => (filter: IExpenseRequestListFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IExpenseRequestListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.expenseRequestState.all;
    const { loadAllRequest } = this.props.expenseRequestDispatch;

    const config: IListConfig<IExpense> = {
      // page
      page: {
        uid: AppMenu.ExpenseRequest,
        parentUid: AppMenu.Expense,
        title: this.props.intl.formatMessage(expenseMessage.request.page.title),
        description: this.props.intl.formatMessage(expenseMessage.request.page.subTitle),
      },
      
      // top bar
      fields: Object.keys(ExpenseField).map(key => ({ 
        value: key, 
        name: ExpenseField[key] 
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
            this.props.history.push('/expense/requests/form'); 
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
                expenseType: this.props.expenseType,
                start: this.props.start,
                end: this.props.end,
                statusType: this.props.statusType,
                status: this.props.status,
                isRejected: this.props.isRejected,
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
      onBind: (item: IExpense, index: number) => ({
        key: index,
        primary: item.uid,
        secondary: item.notes && item.notes || '',
        tertiary: item.customer && item.customer.name || item.customerUid,
        quaternary: this.props.intl.formatNumber(item.value, GlobalFormat.CurrencyDefault),
        quinary: item.status && item.status.value || item.statusType,
        senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
      }),

      // summary component
      summaryComponent: (item: IExpense) => ( 
        <ExpenseSummary data={item} />
      ),

      // action component
      actionComponent: (item: IExpense, callback: ListHandler) => (
        <React.Fragment>
          {
            isModuleRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => this.props.history.push(`/expense/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => this.props.history.push(`/expense/requests/${item.uid}`)}
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
              this.props.expenseType !== undefined ||
              this.props.start !== undefined ||
              this.props.end !== undefined ||
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
      this.props.customerUid !== nextProps.customerUid ||
      this.props.statusType !== nextProps.statusType ||
      this.props.expenseType !== nextProps.expenseType ||
      this.props.start !== nextProps.start ||
      this.props.end !== nextProps.end ||
      this.props.status !== nextProps.status ||
      this.props.isRejected !== nextProps.isRejected
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const ExpenseRequestList = compose(
  setDisplayName('ExpenseRequestList'),
  withUser,
  withExpenseRequest,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);