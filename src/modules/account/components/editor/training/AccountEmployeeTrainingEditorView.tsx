import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeTrainingEditorProps } from './AccountEmployeeTrainingEditor';
import { AccountEmployeeTrainingContainerForm, AccountEmployeeTrainingFormData } from './form/AccountEmployeeTrainingContainerForm';

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

  // init form values
  const initialValues: AccountEmployeeTrainingFormData = {
    training: {
      employeeUid: props.match.params.employeeUid,
      uid: undefined,
      name: undefined,
      trainingType: undefined,
      certificationType: undefined,
      organizer: undefined,
      start: undefined,
      end: undefined
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

      initialValues.training.uid = data.uid;
      initialValues.training.name = data.name;
      initialValues.training.trainingType = data.trainingType;
      initialValues.training.certificationType = data.certificationType;
      initialValues.training.start = data.start;
      initialValues.training.end = data.end;
      initialValues.training.organizer = data.organizer;

      return renderForm(initialValues);
    }
  }

  return null;
};