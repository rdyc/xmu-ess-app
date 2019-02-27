import { ISystemDetail } from '@common/classes/response';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import * as React from 'react';
import { CommonDetailProps } from './CommonDetail';
import { CommonInformation } from './shared/CommonInformation';

export const CommonDetailView: React.SFC<CommonDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.Common,
      parentUid: AppMenu.Lookup,
      parentUrl: `/common/system/${props.match.params.category}`,
      title: props.intl.formatMessage(commonMessage.system.page.detailTitle),
      description : props.intl.formatMessage(commonMessage.system.page.detailSubTitle)
    }}
    options={props.pageOptions}
    state={props.commonSystemState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: ISystemDetail) => (
      <CommonInformation 
        data={data} 
        category={props.match.params.category}
      />
    )}
    secondary={() => ([])}
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