import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeFamilyEditorProps } from './AccountEmployeeFamilyEditor';
import { AccountEmployeeFamilyContainerForm, AccountEmployeeFamilyFormData } from './form/AccountEmployeeFamilyContainerForm';

export const AccountEmployeeFamilyEditorView: React.SFC<AccountEmployeeFamilyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeFamilyState.detail;

  const renderForm = (formData: AccountEmployeeFamilyFormData) => (
    <AccountEmployeeFamilyContainerForm
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
  const initialValues: AccountEmployeeFamilyFormData = {
    family: {
      employeeUid: props.match.params.employeeUid,
      uid: undefined,
      familyType: undefined,
      fullName: undefined,
      genderType: undefined,
      birthPlace: undefined,
      birthDate: undefined
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

      initialValues.family.uid = data.uid;
      initialValues.family.familyType = data.familyType;
      initialValues.family.fullName = data.fullName;
      initialValues.family.genderType = data.genderType;
      initialValues.family.birthPlace = data.birthPlace;
      initialValues.family.birthDate = data.birthDate;

      return renderForm(initialValues);
    }
  }

  return null;
};