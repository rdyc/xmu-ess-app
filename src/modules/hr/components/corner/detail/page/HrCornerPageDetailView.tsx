import AppMenu from '@constants/AppMenu';
import { IHrCornerPageDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { HrCornerPageContent } from './HrCornerPageContent';
import { HrCornerPageDetailProps } from './HrCornerPageDetail';
import { HrCornerPageInformation } from './HrCornerPageInformation';

export const HrCornerPageDetailView: React.SFC<HrCornerPageDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.HRCorner,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/corner/page',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Corner Page'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCornerPageState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCornerPageDetail) => ([
      <HrCornerPageInformation data={data} />
    ])}
    fortiary={(data: IHrCornerPageDetail) => ([
      <HrCornerPageContent data={data} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-corner-page-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
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
      onSubmit={props.handleSubmit} 
      onSubmitSuccess={props.handleSubmitSuccess}
      onSubmitFail={props.handleSubmitFail}
    />
  </PreviewPage>
);