import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeTrainingEditorProps } from './AccountEmployeeTrainingEditor';
import { AccountEmployeeTrainingContainerForm, AccountEmployeeTrainingFormData } from './form/training/AccountEmployeeTrainingContainerForm';

export const AccountEmployeeTrainingEditorView: React.SFC<AccountEmployeeTrainingEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeTrainingState.detail;

  const renderForm = (formData: AccountEmployeeTrainingFormData) => (
    <AccountEmployeeTrainingContainerForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={submitDialogTitle}
      submitDialogContentText={submitDialogContentText}
      submitDialogCancelText={submitDialogCancelText}
      submitDialogConfirmedText={submitDialogConfirmedText}
    />
  );

  const initialValues: AccountEmployeeTrainingFormData = {
    information: {
      uid: undefined,
      employeeUid: undefined,
      name: undefined,
      start: undefined,
      end: undefined,
      organizer: undefined,
      trainingType: undefined,
      certificationType: undefined
    }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;
      // basic
      initialValues.information.uid = data.uid;
      initialValues.information.name = data.name;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.organizer = data.organizer;
      initialValues.information.trainingType = data.trainingType;
      initialValues.information.certificationType = data.certificationType;

      return renderForm(initialValues);
    }
  }

  return null;
};