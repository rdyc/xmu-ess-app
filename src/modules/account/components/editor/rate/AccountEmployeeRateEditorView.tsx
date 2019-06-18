import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeRateEditorProps } from './AccountEmployeeRateEditor';
import { AccountEmployeeRateForm, AccountEmployeeRateFormData } from './form/AccountEmployeeRateForm';

export const AccountEmployeeRateEditorView: React.SFC<AccountEmployeeRateEditorProps> = props => {
  const { formMode } = props;
  const { isLoading, response } = props.accountEmployeeRateState.detail;

  const renderForm = (formData: AccountEmployeeRateFormData) => (
    <AccountEmployeeRateForm 
      formMode={formMode}
      initialValues={formData}
      validate={props.handleValidate}
      onSubmit={props.handleSubmit} 
      onSubmitSuccess={props.handleSubmitSuccess}
      onSubmitFail={props.handleSubmitFail}
      submitDialogTitle={props.submitDialogTitle}
      submitDialogContentText={props.submitDialogContentText}
      submitDialogCancelText={props.submitDialogCancelText}
      submitDialogConfirmedText={props.submitDialogConfirmedText}
    />
  );

  // init form values
  const initialValues: AccountEmployeeRateFormData = {
    information: {
      uid: undefined,
      value: 0,
    }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading) {
      return (
        <div className={props.classes.preloader}>
          <div className={props.classes.preloaderContent}>
            <CircularProgress 
              style={{margin: 'auto'}} 
              color="secondary"
            />

            <Typography
              className={props.classes.marginFarTop}
            >
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          </div>    
        </div>
      );
    }

    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.value = data.value;

      return renderForm(initialValues);
    }
  }

  return null;
};