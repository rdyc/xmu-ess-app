import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeFamilyContainerForm, AccountEmployeeFamilyFormData } from './AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyEditorProps } from './AccountEmployeeFamilyEditor';

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

  const initialValues: AccountEmployeeFamilyFormData = {
    information: {
      employeeUid: undefined,
      familyType: null,
      fullName: null,
      genderType: null,
      birthPlace: null,
      birthDate: null
    },
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
      initialValues.information.employeeUid = data.uid;
      initialValues.information.familyType = data.familyType;
      initialValues.information.fullName = data.fullName;
      initialValues.information.genderType = data.genderType;
      initialValues.information.birthPlace = data.birthPlace;
      initialValues.information.birthDate = data.birthDate;

      return renderForm(initialValues);
    }
  }

  return null;
};