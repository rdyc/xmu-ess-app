import { IEmployeeDetail } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { AccountEmployeeBank } from './AccountEmployeeBank';
import { AccountEmployeeContact } from './AccountEmployeeContact';
import { AccountEmployeeDetailProps } from './AccountEmployeeDetail';
import { AccountEmployeeInformation } from './AccountEmployeeInformation';
import { DetailPage } from './DetailPage';

const config: SingleConfig<IEmployeeDetail, AccountEmployeeDetailProps> = {
  // page info
  page: (props: AccountEmployeeDetailProps) => ({
    uid: AppMenu.Account,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(accountMessage.employee.page.detailTitle),
    description: props.intl.formatMessage(accountMessage.employee.page.detailSubHeader),
  }),

  // parent url
  parentUrl: () => '/account/employee',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AccountEmployeeDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: AccountEmployeeDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeState.detail;
    const { loadDetailRequest } = props.accountEmployeeDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.employeeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.employeeUid !== props.match.params.employeeUid) || !response || forceReload) {
        loadDetailRequest({
          employeeUid: props.match.params.employeeUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AccountEmployeeDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeState.detail;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IEmployeeDetail) => (
    <AccountEmployeeInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IEmployeeDetail) => ([
    <AccountEmployeeContact data={data}/>,
    <AccountEmployeeBank data={data}/> 
  ])
};

export const AccountEmployeeDetailView: React.SFC<AccountEmployeeDetailProps> = props => {

  const render = (
  <React.Fragment>
    <DetailPage
      tab={0}
    >
      <div style={{ padding: 8 * 3 }}>
        <SinglePage
          config={config}
          connectedProps={props}
        />
      </div>
    </DetailPage>
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
  );

  return render;
};