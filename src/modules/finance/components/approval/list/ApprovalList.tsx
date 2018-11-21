import AppMenu from '@constants/AppMenu';
import { IFinance } from '@finance/classes/response';
import { FinanceApprovalUserAction, FinanceField } from '@finance/classes/types';
import { FinanceSummary } from '@finance/components/approval/detail/shared/FinanceSummary';
import { financeApprovalFieldTranslator } from '@finance/helper';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { ICollectionValue } from '@layout/classes/core';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
  CollectionPageProps,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

const financeFields: ICollectionValue[] = Object.keys(FinanceField).map(key => ({ 
  value: key, 
  name: FinanceField[key] 
}));

const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
  {
    id: FinanceApprovalUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => props.setForceReload(true)
  },
]);

const config: CollectionConfig<IFinance, AllProps> = {
  // page info
  uid: AppMenu.FinanceApproval,
  parentUid: AppMenu.Finance,
  title: 'Finance',
  description : 'Lorem Ipsum Something',
  
  // top bar
  fields: financeFields,
  fieldTranslator: financeApprovalFieldTranslator,

  // selection
  hasSelection: true,
  selectionProcessing: (values: string[]) => {
    return `/finance/approvals/payment/${values}`;
  },

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.financeApprovalState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: menuOptions,
  
  // redirection
  hasRedirection: true,
  onRedirect: (item: IFinance): string => {
    return `/finance/approvals/${item.uid}`;
  },

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.financeApprovalState.all;
    const { loadAllRequest } = states.financeApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          filter: {
            direction: params.direction,
            orderBy: params.orderBy,
            page: params.page,
            size: params.size,
            moduleType: undefined,
            employeeName: undefined,
            financeStatusTypes: undefined,
            settlementStatusTypes: undefined,
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
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.financeApprovalState.all;
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IFinance, index: number) => ({
    key: index,
    primary: item.module && item.module.value,
    secondary: item.document.changes.created && item.document.changes.created.fullName || item.document.changes.createdBy,
    tertiary: item.document.amount && item.document.amount.total && item.document.amount.total.toString() || '0',
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IFinance) => ( 
    <FinanceSummary data={item} />
  ),

  // action component
  actionComponent: (item: IFinance) => (
    <Button 
      size="small"
      onClick={() => alert(`go to ${item.uid}`)}
    >
      <FormattedMessage {...layoutMessage.action.details}/>
    </Button>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps 
  = WithUser
  & WithFinanceApproval;

const approvalList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ApprovalList = compose(
  withUser,
  withFinanceApproval
)(approvalList);