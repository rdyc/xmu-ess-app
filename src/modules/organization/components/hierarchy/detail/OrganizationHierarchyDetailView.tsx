import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IHierarchyDetail } from '@organization/classes/response/hierarchy';
import { HierarchyUserAction } from '@organization/classes/types';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { isNullOrUndefined } from 'util';
import { OrganizationHierarchyDetailProps } from './OrganizationHierarchyDetail';
import { OrganizationHierarchyInformation } from './shared/OrganizationHierarchyInformation';
import { OrganizationHierarchyItem } from './shared/OrganizationHierarchyItem';

const config: SingleConfig<IHierarchyDetail, OrganizationHierarchyDetailProps> = {
  // page info
  page: (props: OrganizationHierarchyDetailProps) => ({
    uid: AppMenu.LookupApprovalHierarchy,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(organizationMessage.hierarchy.page.detailTitle),
    description : props.intl.formatMessage(organizationMessage.hierarchy.page.detailSubHeader)
  }),
  
  parentUrl: () => `/organization/hierarchy`,
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: OrganizationHierarchyDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: HierarchyUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: HierarchyUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: OrganizationHierarchyDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.organizationHierarchyState.detail;
    const { loadDetailRequest } = props.organizationHierarchyDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.hierarchyUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.hierarchyUid !== props.match.params.hierarchyUid) && !isNullOrUndefined(props.history.location.state) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          hierarchyUid: props.match.params.hierarchyUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: OrganizationHierarchyDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.organizationHierarchyState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: IHierarchyDetail) => (
    <OrganizationHierarchyInformation 
      data={data} 
    />
  ),
  
  // secondary (multiple components are allowed)
  secondaryComponents: (data: IHierarchyDetail) => ([
    <div>
      {
        data.items &&
        <OrganizationHierarchyItem
          data={data.items && data.items}
        />
      }
    </div>
  ]),
};

export const OrganizationHierarchyDetailView: React.SFC<OrganizationHierarchyDetailProps> = props => (
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