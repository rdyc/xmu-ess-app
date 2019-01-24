import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { FormInstance } from 'redux-form';
import { AccountEmployeeRateEditorProps } from './AccountEmployeeRateEditor';
import { AccountEmployeeRateForm } from './form/rate/AccountEmployeeRateForm';

export const AccountEmployeeRateEditorView: React.SFC<AccountEmployeeRateEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    intl, initialValues, isOpenDialog } = props;
  
  const ref = React.createRef<FormInstance<any, any, any>>();
  const isMobile = isWidthDown('sm', props.width);

  const renderDialog = (
    <Dialog
      open={isOpenDialog}
      fullScreen={isMobile}
      scroll="paper"
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {intl.formatMessage(accountMessage.rate.dialog.modifyTitle)}
        </Typography>
      </DialogTitle>

      <AccountEmployeeRateForm 
        formMode={formMode || FormMode.New}
        ref={ref}
        initialValues={initialValues}
        validate={handleValidate}
        onSubmit={handleSubmit} 
        onSubmitSuccess={handleSubmitSuccess}
        onSubmitFail={handleSubmitFail}
        handleDialogClose={props.handleDialogClose}
        buttonDiscard={intl.formatMessage(layoutMessage.action.discard)}
        buttonProcess={intl.formatMessage(layoutMessage.text.processing)}
        buttonReset={intl.formatMessage(layoutMessage.action.reset)}
        buttonSubmit={intl.formatMessage(layoutMessage.action.submit)}
      />
    </Dialog>
  );

  return renderDialog;
};