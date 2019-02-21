import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { IMileageExceptionDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';

import { LookupMileageExceptionDetailProps } from './LookupMileageExceptionDetail';
import { LookupMileageExceptionInformation } from './LookupMileageExceptionInformation';

export const LookupMileageExceptionDetailView: React.SFC<LookupMileageExceptionDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/mileageexceptions',
      title: props.intl.formatMessage(lookupMessage.mileageException.page.detailTitle),
      description: props.intl.formatMessage(lookupMessage.mileageException.page.detailSubHeader),
    }}
    options={props.pageOptions}
    state={props.mileageExceptionState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IMileageExceptionDetail) => (
      <LookupMileageExceptionInformation data={data} />
    )}
    secondary={() => ([
      //
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