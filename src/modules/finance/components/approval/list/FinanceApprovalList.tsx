import { FinanceStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { IFinance } from '@finance/classes/response';
import { FinanceField, FinanceUserAction } from '@finance/classes/types';
import { FinanceSummary } from '@finance/components/approval/detail/shared/FinanceSummary';
import { financeApprovalFieldTranslator } from '@finance/helper';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeMessage } from '@finance/locales/messages/financeMessage';
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
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IFinance, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: AppMenu.FinanceApproval,
    parentUid: AppMenu.Finance,
    title: props.intl.formatMessage(financeMessage.approval.page.title),
    description: props.intl.formatMessage(financeMessage.approval.page.subTitle)
  }),
  
  // top bar
  fields: Object.keys(FinanceField).map(key => ({ 
    value: key, 
    name: FinanceField[key] 
  })),
  fieldTranslator: financeApprovalFieldTranslator,

  // selection
  hasSelection: true,
  notSelectionTypes: [FinanceStatusType.NotPaid, FinanceStatusType.Paid],
  onProcessSelection: (values: string[], callback: CollectionHandler) => {
    callback.handleRedirectTo('/finance/approvals/payment', {values});
  },

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.financeApprovalState.all;

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
      id: FinanceUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
  ]),
  
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
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.financeApprovalState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IFinance, index: number, props: AllProps) => ({
    key: index,
    primary: item.module && item.module.value,
    secondary: item.document.changes.created && item.document.changes.created.fullName || item.document.changes.createdBy,
    tertiary: item.document.amount && item.document.amount.total && props.intl.formatNumber(item.document.amount.total, GlobalFormat.CurrencyDefault) || '0',
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IFinance) => ( 
    <FinanceSummary data={item} />
  ),

  // action component
  actionComponent: (item: IFinance, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/finance/approvals/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps 
  = WithUser
  & WithFinanceApproval
  & InjectedIntlProps;

const financeApprovalList: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const FinanceApprovalList = compose(
  withUser,
  withFinanceApproval,
  injectIntl,
)(financeApprovalList);