import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseField, ExpenseUserAction } from '@expense/classes/types';
import { ExpenseSummary } from '@expense/components/request/detail/shared/ExpenseSummary';
import { expenseFieldTranslator } from '@expense/helper';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { expenseMessages } from '@expense/locales/messages/expenseMessages';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
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
    title: props.intl.formatMessage(expenseMessages.request.page.title),
    description: props.intl.formatMessage(expenseMessages.request.page.subTitle),
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

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.expenseRequestState.all;
    const { loadAllRequest } = states.expenseRequestDispatch;

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
  onBind: (item: IExpense, index: number) => ({
    key: index,
    primary: item.notes && item.notes || '',
    secondary: item.expense && item.expense.value || item.expenseType,
    tertiary: item.project && item.project.name || item.projectUid,
    quaternary: item.uid,
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

const requestListView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const RequestListView = compose(
  withUser,
  withExpenseRequest,
  injectIntl
)(requestListView);