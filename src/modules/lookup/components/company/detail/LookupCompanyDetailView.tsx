import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICompanyDetail } from '@lookup/classes/response/company';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { CompanyDetailProps } from './LookupCompanyDetail';
import { CompanyInformation } from './shared/LookupCompanyInformation';

const config: SingleConfig<ICompanyDetail, CompanyDetailProps> = {
  // page info
  page: (props: CompanyDetailProps) => ({
    uid: AppMenu.LookupCompany,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.company.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.company.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: CompanyDetailProps) => '/lookup/company',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: CompanyDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
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
  onDataLoad: (props: CompanyDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupCompanyState.detail;
    const { loadDetailRequest } = props.lookupCompanyDispatch;

    // when user is set and not loading and has timesheetUid in route params
    if (user && !isLoading && props.match.params.companyUid) {
      // when timesheetUid was changed or response are empty or force to reload
      if ((request && request.companyUid !== props.match.params.companyUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.match.params.companyUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: CompanyDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupCompanyState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },
  
  // primary
  primaryComponent: (data: ICompanyDetail, props: CompanyDetailProps) => (
    <CompanyInformation data={data}/>
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: ICompanyDetail, props: CompanyDetailProps) => ([
    // <WorkflowHistory data={data.workflow} />
  ])
};

export const LookupCompanyDetailView: React.SFC<CompanyDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
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
      onSubmit={props.handleDelete} 
      onSubmitSuccess={props.handleDeleteSuccess}
      onSubmitFail={props.handleDeleteFail}
    />
  </SinglePage>
);
