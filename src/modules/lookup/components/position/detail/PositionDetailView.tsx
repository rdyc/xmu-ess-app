import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { IPositionDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { DeleteForm } from '../editor/DeleteForm';
import { PositionDetailProps } from './PositionDetail';
import { PositionInformation } from './shared/PositionInformation';

export const PositionDetailView: React.SFC<PositionDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupPosition,
      parentUid: AppMenu.Lookup,

      parentUrl: '/lookup/positions',
      title: props.intl.formatMessage(lookupMessage.position.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.position.page.detailSubHeader)
    }}
    state={props.lookupPositionState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IPositionDetail) => (
      <PositionInformation data={data} />
    )}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="lookup-position-option"
        selectable={false}
        menuOptions={props.menuOptions} 
        onSelected={props.handleOnSelectedMenu} 
      />
    }
  >
    <React.Fragment>
      <DeleteForm
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
  </PreviewPage>
);