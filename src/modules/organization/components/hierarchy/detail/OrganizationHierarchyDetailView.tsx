import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { IHierarchyDetail } from '@organization/classes/response/hierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { OrganizationHierarchyDetailProps } from './OrganizationHierarchyDetail';
import { OrganizationHierarchyInformation } from './shared/OrganizationHierarchyInformation';
import { OrganizationHierarchyItem } from './shared/OrganizationHierarchyItem';

export const OrganizationHierarchyDetailView: React.SFC<OrganizationHierarchyDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupApprovalHierarchy,
      parentUid: AppMenu.Lookup,
      title: props.intl.formatMessage(organizationMessage.hierarchy.page.detailTitle),
      description : props.intl.formatMessage(organizationMessage.hierarchy.page.detailSubHeader)
    }}
    options={props.pageOptions}
    state={props.organizationHierarchyState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHierarchyDetail) => (
      <OrganizationHierarchyInformation 
      data={data} 
    />
    )}
    secondary={(data: IHierarchyDetail) => ([
      <div>
      {
        data.items &&
        <OrganizationHierarchyItem
          data={data.items && data.items}
        />
      }
    </div>
    ])}
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
  </PreviewPage>
);