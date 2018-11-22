import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';

import { IFinanceDetail } from '@finance/classes/response';
import { FinanceUserAction } from '@finance/classes/types';
import { financeMessages } from '@finance/locales/messages/financeMessages';
import { FinanceApprovalDetailProps } from './FinanceApprovalDetail';
import { FinanceInformation } from './shared/FinanceInformation';

const config: SingleConfig<IFinanceDetail, FinanceApprovalDetailProps> = {
  // page info
  page: (props: FinanceApprovalDetailProps) => ({
    uid: AppMenu.FinanceApproval,
    parentUid: AppMenu.Finance,
    title: props.intl.formatMessage(financeMessages.approval.page.detailTitle),
    description: props.intl.formatMessage(financeMessages.approval.page.detailSubTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: FinanceApprovalDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: FinanceUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
  ]),

  // events
  onDataLoad: (props: FinanceApprovalDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.financeApprovalState.detail;
    const { loadDetailRequest } = props.financeApprovalDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.financeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.financeUid !== props.match.params.financeUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          financeUid: props.match.params.financeUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType(response.data.statusType);
      }
    }
  },
  onUpdated: (states: FinanceApprovalDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.financeApprovalState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType(response.data.statusType);
    }
  },

  // primary
  primaryComponent: (data: IFinanceDetail, props: FinanceApprovalDetailProps) => (
    <FinanceInformation 
      data={data} 
      handleToDocument={props.handleToDocument}
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: () => ([
  ])
};

export const FinanceApprovalDetailView: React.SFC<FinanceApprovalDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
  </SinglePage>
);