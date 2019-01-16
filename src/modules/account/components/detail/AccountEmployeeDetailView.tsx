import { IEmployeeDetail } from '@account/classes/response';
import { AccountEmployeeUserAction } from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';
import { AccountEmployeeAccess } from './access/AccountEmployeeAccess';
import { AccountEmployeeAccessHistory } from './accessHistory/AccountEmployeeAccessHistory';
import { AccountEmployeeBank } from './AccountEmployeeBank';
import { AccountEmployeeContact } from './AccountEmployeeContact';
import { AccountEmployeeDetailProps } from './AccountEmployeeDetail';
import { AccountEmployeeInformation } from './AccountEmployeeInformation';
import { DetailPage } from './DetailPage';
import { AccountEmployeeEducation } from './education/AccountEmployeeEducation';
import { AccountEmployeeExperience } from './experience/AccountEmployeeExperience';
import { AccountEmployeeFamily } from './family/AccountEmployeeFamily';
import { AccountEmployeeTraining } from './training/AccountEmployeeTraining';
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
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: AccountEmployeeUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
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
    }
    {props.tab === 1 && <div style={{ padding: 8 * 3 }}><AccountEmployeeAccessHistory employeeUid={props.match.params.employeeUid}/></div>}
    {props.tab === 2 && <div style={{ padding: 8 * 3 }}><AccountEmployeeEducation employeeUid={props.match.params.employeeUid}/></div>}
    {props.tab === 3 && <div style={{ padding: 8 * 3 }}><AccountEmployeeFamily employeeUid={props.match.params.employeeUid}/></div>}
    {props.tab === 4 && <div style={{ padding: 8 * 3 }}><AccountEmployeeExperience employeeUid={props.match.params.employeeUid}/></div>}
    {props.tab === 5 && <div style={{ padding: 8 * 3 }}><AccountEmployeeTraining employeeUid={props.match.params.employeeUid}/></div>}
    {props.tab === 6 && <div style={{ padding: 8 * 3 }}><AccountEmployeeAccess employeeUid={props.match.params.employeeUid}/></div>}    

    </DetailPage>
    
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
  </React.Fragment>
  );

  return render;
};