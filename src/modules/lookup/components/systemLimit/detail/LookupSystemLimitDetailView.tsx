import AppMenu from '@constants/AppMenu';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';

import { ISystemLimitDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { SystemLimitDetailProps } from './LookupSystemLimitDetail';
import { LookupSystemLimitInformation } from './LookupSystemLimitInformation';

export const LookupSystemLimitDetailView: React.SFC<SystemLimitDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupSystemLimit,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/systemlimits',
      title: props.intl.formatMessage(lookupMessage.systemLimit.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.systemLimit.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.systemLimitState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ISystemLimitDetail) => (
      <LookupSystemLimitInformation data={data} />
    )}
    secondary={() => ([
      //
    ])}
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