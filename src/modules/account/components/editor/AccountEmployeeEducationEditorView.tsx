import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Dialog, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeEducationEditorProps } from './AccountEmployeeEducationEditor';
import { AccountEmployeeEducationContainerForm, AccountEmployeeEducationFormData } from './form/education/AccountEmployeeEducationContainer';

export const AccountEmployeeEducationEditorView: React.SFC<AccountEmployeeEducationEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeEducationState.detail;

  const renderForm = (formData: AccountEmployeeEducationFormData) => (
    <Dialog
      open={props.dialogIsOpen}
      onClose={props.handleDialog}
      scroll="paper"
    >
      <AccountEmployeeEducationContainerForm 
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
    </Dialog>
  );

  const initialValues: AccountEmployeeEducationFormData = {
    education: {
      uid: undefined,
      employeeUid: null,
      degreeType: null,
      institution: null,
      major: null,
      start: null,
      end: null
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
      initialValues.education.uid = data.uid;
      initialValues.education.employeeUid = data.employeeUid;
      initialValues.education.degreeType = data.degreeType;
      initialValues.education.institution = data.institution;
      initialValues.education.major = data.major;
      initialValues.education.start = data.start;
      initialValues.education.uid = data.uid;

      return renderForm(initialValues);
    }
  }

  return null;
};