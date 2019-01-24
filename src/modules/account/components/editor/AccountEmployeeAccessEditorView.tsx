import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { FormInstance } from 'redux-form';
import { AccountEmployeeAccessEditorProps } from './AccountEmployeeAccessEditor';
import { AccountEmployeeAccessForm } from './form/access/AccountEmployeeAccessForm';

export const AccountEmployeeAccessEditorView: React.SFC<AccountEmployeeAccessEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    intl, initialValues, isOpenDialog } = props;
  
  const ref = React.createRef<FormInstance<any, any, any>>();
  const isMobile = isWidthDown('sm', props.width);

  const dialogTitle = () => {
    switch (formMode) {
      case FormMode.Edit: return accountMessage.access.dialog.modifyTitle;
      case FormMode.Delete: return accountMessage.access.dialog.deleteTitle;

      default: return accountMessage.access.dialog.createTitle;
    }
  };

  const renderDialog = (
    <Dialog
      open={isOpenDialog}
      fullScreen={isMobile}
      scroll="paper"
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {intl.formatMessage(dialogTitle())}
        </Typography>
      </DialogTitle>

      <AccountEmployeeAccessForm 
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