import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeEducationEditorProps } from './AccountEmployeeEducationEditor';
import { AccountEmployeeEducationContainerForm, AccountEmployeeEducationFormData } from './form/AccountEmployeeEducationContainer';

export const AccountEmployeeEducationEditorView: React.SFC<AccountEmployeeEducationEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeEducationState.detail;

  const renderForm = (formData: AccountEmployeeEducationFormData) => (
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
  );

  // init form values
  const initialValues: AccountEmployeeEducationFormData = {
    education: {
      employeeUid: props.match.params.employeeUid,
      uid: undefined,
      degreeType: undefined,
      institution: undefined,
      major: undefined,
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

      initialValues.education.uid = data.uid;
      initialValues.education.degreeType = data.degreeType;
      initialValues.education.institution = data.institution;
      initialValues.education.major = data.major;
      initialValues.education.start = data.start;
      initialValues.education.end = data.end;

      return renderForm(initialValues);
    }
  }

  return null;
};