import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseField, ExpenseUserAction } from '@expense/classes/types';
import { ExpenseSummary } from '@expense/components/request/detail/shared/ExpenseSummary';
import { expenseFieldTranslator } from '@expense/helper';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { isModuleRequestEditable } from '@organization/helper/isModuleRequestEditable';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IExpense, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.ExpenseRequest,
    parentUid: AppMenu.Expense,
    title: props.intl.formatMessage(expenseMessage.request.page.title),
    description: props.intl.formatMessage(expenseMessage.request.page.subTitle),
  }),
  
  // top bar
  fields: Object.keys(ExpenseField).map(key => ({ 
    value: key, 
    name: ExpenseField[key] 
  })),
  fieldTranslator: expenseFieldTranslator,

  // selection
  hasSelection: false,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.expenseRequestState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: ExpenseUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: ExpenseUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo('/expense/requests/form')
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.expenseRequestState.all;
    const { loadAllRequest } = props.expenseRequestDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            start: undefined,
            end: undefined,
            status: undefined,
            isRejected: undefined,
            query: {
              direction: params.direction,
              orderBy: params.orderBy,
              page: params.page,
              size: params.size,
              find: params.find,
              findBy: params.findBy,
            },
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.expenseRequestState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IExpense, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.notes && item.notes || '',
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: props.intl.formatNumber(item.value, GlobalFormat.CurrencyDefault),
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IExpense) => ( 
    <ExpenseSummary data={item} />
  ),

  // action component
  actionComponent: (item: IExpense, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isModuleRequestEditable(item.statusType) &&
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/expense/requests/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button> || ''
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/expense/requests/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps 
  = WithUser
  & WithExpenseRequest
  & InjectedIntlProps;

const expenseRequestListView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ExpenseRequestListView = compose(
  withUser,
  withExpenseRequest,
  injectIntl
)(expenseRequestListView);