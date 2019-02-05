import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICustomerDetail } from '@lookup/classes/response';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupCustomerDetailProps } from './LookupCustomerDetail';
import { LookupCustomerInformation } from './shared/LookupCustomerInformation';

const config: SingleConfig<ICustomerDetail, LookupCustomerDetailProps> = {
  // page info
  page: (props: LookupCustomerDetailProps) => ({
    uid: AppMenu.LookupCustomer,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.customer.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.customer.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: LookupCustomerDetailProps) => '/lookup/customer/list',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupCustomerDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Modify)
    },
    {
      id: LookupUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.delete),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Delete)
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
    <React.Fragment>
      <Delete 
        action={props.action}
        isOpenDialog={props.dialogOpen}
        title={props.dialogTitle}
        content={props.dialogContent}
        labelCancel={props.dialogCancelLabel}
        labelConfirm={props.dialogConfirmLabel}
        handleDialogOpen={props.handleOnOpenDialog}
        handleDialogClose={props.handleOnCloseDialog}
        handleDialogConfirmed={props.handleOnConfirm}
        onSubmit={props.handleSubmit} 
        onSubmitSuccess={props.handleSubmitSuccess}
        onSubmitFail={props.handleSubmitFail}
      />
    </React.Fragment>
  </SinglePage>
);
