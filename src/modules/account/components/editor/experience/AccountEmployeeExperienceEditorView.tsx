import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeExperienceEditorProps } from './AccountEmployeeExperienceEditor';
import { AccountEmployeeExperienceContainerForm, AccountEmployeeExperienceFormData } from './form/AccountEmployeeExperienceContainerForm';

export const AccountEmployeeExperienceEditorView: React.SFC<AccountEmployeeExperienceEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeExperienceState.detail;

  const renderForm = (formData: AccountEmployeeExperienceFormData) => (
    <AccountEmployeeExperienceContainerForm
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
  const initialValues: AccountEmployeeExperienceFormData = {
    experience: {
      employeeUid: props.match.params.employeeUid,
      uid: undefined,
      company: undefined,
      position: undefined,
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

      initialValues.experience.uid = data.uid;
      initialValues.experience.company = data.company;
      initialValues.experience.position = data.position;
      initialValues.experience.start = data.start;
      initialValues.experience.end = data.end;

      return renderForm(initialValues);
    }
  }

  return null;
};