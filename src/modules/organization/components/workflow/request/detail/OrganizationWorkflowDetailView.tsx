import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { IWorkflowList } from '@organization/classes/response/workflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { OrganizationWorkflowDetailProps } from './OrganizationWorkflowDetail';
import { OrganizationWorkflowInformation } from './shared/OrganizationWorkflowInformation';
import { WorkflowMenuInformation } from './shared/WorkflowMenuInformation';

const config: SingleConfig<IWorkflowList[], OrganizationWorkflowDetailProps> = {
  // page info
  page: (props: OrganizationWorkflowDetailProps) => ({
    uid: AppMenu.LookupWorkflow,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(organizationMessage.workflowSetup.page.detailTitle),
    description: props.intl.formatMessage(organizationMessage.workflowSetup.page.detailSubHeader)
  }),

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: OrganizationWorkflowDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: DiemUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: DiemUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: OrganizationWorkflowDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupMenuState.detail;
    // const workflowResponse = props.organizationWorkflowState.list.response;
    const { loadListRequest } = props.organizationWorkflowDispatch;
    const { loadDetailRequest } = props.lookupMenuDispatch;

    const filter: any = {
      menuUid: props.match.params.menuUid,
      companyUid: props.match.params.companyUid,
      orderBy: 'priority',
      direction: 'ascending'
    };

    // when user is set and not loading and has diemUid in route params
    if (user && !isLoading && props.match.params.menuUid && props.match.params.companyUid) {
      // when diemUid was changed or response are empty or force to reload
      if ((request && request.menuUid !== props.match.params.menuUid) || !response || forceReload) {
        loadListRequest({
          filter
        });

        // load menu detail
        loadDetailRequest({
          menuUid: props.match.params.menuUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: OrganizationWorkflowDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.organizationWorkflowState.list;

    callback.handleLoading(isLoading);

    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: IWorkflowList[], props: OrganizationWorkflowDetailProps) => (
    <WorkflowMenuInformation data={props.lookupMenuState.detail.response && props.lookupMenuState.detail.response.data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IWorkflowList[], props: OrganizationWorkflowDetailProps) => ([
    <OrganizationWorkflowInformation data={data}/>
  ])
};

export const OrganizationWorkflowDetailView: React.SFC<OrganizationWorkflowDetailProps> = props => (
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