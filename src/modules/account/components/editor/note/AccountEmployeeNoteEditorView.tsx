import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeNoteEditorProps } from './AccountEmployeeNoteEditor';
import { AccountEmployeeNoteContainerForm, AccountEmployeeNoteFormData } from './form/AccountEmployeeNoteContainerForm';

export const AccountEmployeeNoteEditorView: React.SFC<AccountEmployeeNoteEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeNoteState.detail;

  const renderForm = (formData: AccountEmployeeNoteFormData) =>  (
    <AccountEmployeeNoteContainerForm
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
  const initialValues: AccountEmployeeNoteFormData = {
    note: {
      employeeUid: props.match.params.employeeUid,
      id: undefined,
      text: undefined,
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

      initialValues.note.id = data.id;
      initialValues.note.text = data.text;

      return renderForm(initialValues);
    }
  }

  return null;
};