import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomerDetail } from '@lookup/classes/response';
import { LookupCustomerUserAction } from '@lookup/classes/types/customer/LookupCustomerUserAction';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupCustomerDetailProps } from './LookupCustomerDetail';
import { LookupCustomerInformation } from './shared/LookupCustomerInformation';

const config: SingleConfig<ICustomerDetail, LookupCustomerDetailProps> = {
  // page info
  page: (props: LookupCustomerDetailProps) => ({
    uid: AppMenu.LookupCustomer,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.company.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.company.page.detailSubHeader),
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupCustomerDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupCustomerUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: LookupCustomerUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: LookupCustomerDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupCustomerState.detail;
    const { loadDetailRequest } = props.lookupCustomerDispatch;

    // when user is set and not loading and has timesheetUid in route params
    if (user && !isLoading && props.match.params.customerUid && props.history.location.state) {
      // when timesheetUid was changed or response are empty or force to reload
      if ((request && request.companyUid !== props.match.params.customerUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          customerUid: props.match.params.customerUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: LookupCustomerDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupCustomerState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },
  
  // primary
  primaryComponent: (data: ICustomerDetail, props: LookupCustomerDetailProps) => (
    <LookupCustomerInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ICustomerDetail, props: LookupCustomerDetailProps) => ([
    // <WorkflowHistory data={data.workflow} />
  ])
};

export const LookupCustomerDetailView: React.SFC<LookupCustomerDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </SinglePage>
);
