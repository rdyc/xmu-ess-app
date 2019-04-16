import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IStructureDetail } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { StructureInformation } from '../shared/StructureInformation';
import { StructureItemInformation } from '../shared/StructureItemInformation';
import { OrganizationStructureDetailProps } from './StructureDetail';

export const StructureDetailView: React.SFC<OrganizationStructureDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupOrganizationStructure,
      parentUid: AppMenu.Lookup,
      parentUrl: `/organization/structure`,
      title: props.intl.formatMessage(organizationMessage.structure.page.detailTitle),
      description: props.intl.formatMessage(organizationMessage.structure.page.detailSubHeader)
    }}
    state={props.organizationStructureState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IStructureDetail) => ([
      <StructureInformation data={data} />
    ])}
    secondary={(data: IStructureDetail) => ([
      <StructureItemInformation data={data.reportTo ? data.reportTo : []} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="organization-structure-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
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