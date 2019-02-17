import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseField } from '@expense/classes/types';
import { ExpenseSummary } from '@expense/components/request/detail/shared/ExpenseSummary';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
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

import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { ExpenseApprovalListFilter, IExpenseApprovalListFilterResult } from './ExpenseApprovalListFilter';

interface IOwnOption {
  
}

interface IOwnState extends IExpenseApprovalListFilterResult {
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
  handleFilterApplied: (filter: IExpenseApprovalListFilterResult) => void;
}

type AllProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithExpenseApproval
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage 
        config={props.config} 
        source={props.expenseApprovalState.all} 
        loadDataWhen={props.shouldUpdate} 
      >
        <ExpenseApprovalListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            customerUid: props.customerUid,
            expenseType: props.expenseType,
            statusType: props.statusType,
            start: props.start,
            end: props.end,
            status: props.status,
            isNotify: props.isNotify
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  const { request } = props.expenseApprovalState.all;

  const state: IOwnState = {
    shouldUpdate: false,
    isFilterOpen: false,
  };

  if (props.location.state) {
    state.status = props.location.state.isNotify && 'complete' || props.location.state.status;
    state.isNotify = props.location.state.isNotify;
  } else {
    if (request && request.filter) {
      state.customerUid = request.filter.customerUid,
      // state.projectUid = request.filter.projectUid,
      state.expenseType = request.filter.expenseType,
      state.statusType = request.filter.statusType,
      state.start = request.filter.start,
      state.end = request.filter.end,
      state.status = request.filter.status,
      state.isNotify = request.filter.isNotify;
    }
  }

  return state;
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdater> = {
  setShouldUpdate: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldUpdate: !state.shouldUpdate
  }),
  setConfig: (state: IOwnState) => (config: IListConfig<IExpense>): Partial<IOwnState> => ({
    config
  }),
  setFilterVisibility: (state: IOwnState) => () => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: IOwnState) => (filter: IExpenseApprovalListFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false
  }),
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleFilterVisibility: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: AllProps) => (filter: IExpenseApprovalListFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() { 
    const { user } = this.props.userState;
    const { isLoading, request, response } = this.props.expenseApprovalState.all;
    const { loadAllRequest } = this.props.expenseApprovalDispatch;

    const config: IListConfig<IExpense> = {
      // page
      page: {
        uid: AppMenu.ExpenseApproval,
        parentUid: AppMenu.Expense,
        title: this.props.intl.formatMessage(expenseMessage.approval.page.title),
        description: this.props.intl.formatMessage(expenseMessage.approval.page.subTitle),
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
    
      // events
      onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false, resetPage?: boolean) => {
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
                isNotify: this.props.isNotify,
                direction: params.direction,
                orderBy: params.orderBy,
                page: resetPage ? 1 : params.page,
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
          <Button 
            size="small"
            onClick={() => this.props.history.push(`/expense/approvals/${item.uid}`)}
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
      this.props.expenseType !== nextProps.expenseType ||
      this.props.start !== nextProps.start ||
      this.props.end !== nextProps.end ||
      this.props.status !== nextProps.status ||
      this.props.isNotify !== nextProps.isNotify
    ) {
      this.props.setShouldUpdate();
    }
  }
};

export const ExpenseApprovalList = compose(
  setDisplayName('ExpenseApprovalList'),
  withUser,
  withExpenseApproval,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(listView);