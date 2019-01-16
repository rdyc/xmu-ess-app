import { FormMode } from '@generic/types';
// import { layoutMessage } from '@layout/locales/messages';
// import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeAccessEditorProps } from './AccountEmployeeAccessEditor';
import { AccountEmployeeAccessForm, AccountEmployeeAccessFormData } from './form/access/AccountEmployeeAccessForm';

export const AccountEmployeeAccessEditorView: React.SFC<AccountEmployeeAccessEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, match,
    submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  // const { isLoading, response } = props.commonSystemState.detail;

  const renderForm = (formData: AccountEmployeeAccessFormData) => (
    <AccountEmployeeAccessForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      category={match.params.category}
      submitDialogTitle={submitDialogTitle}
      submitDialogContentText={submitDialogContentText}
      submitDialogCancelText={submitDialogCancelText}
      submitDialogConfirmedText={submitDialogConfirmedText}
    />
  );

  // init form values
  const initialValues: AccountEmployeeAccessFormData = {
    information: {
      companyUid: undefined,
      positionUid: undefined,
      roleUid: undefined,
      employeeUid: undefined,
      unitType: undefined,
      departementType: undefined,
      levelType: undefined,
      start: undefined,
      end: undefined,
    },
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  // if (formMode === FormMode.Edit) {
  //   if (isLoading && !response) {
  //     return (
  //       <Typography variant="body2">
  //         {intl.formatMessage(layoutMessage.text.loading)}
  //       </Typography>
  //     );
  //   }
    
  //   if (!isLoading && response && response.data) {
  //     // todo: replace values with response data
  //     const data = response.data;

  //     initialValues.information.name = data.name;
  //     initialValues.information.companyUid = data.companyUid;
  //     initialValues.information.parentCode = data.parentCode;
  //     initialValues.information.description = data.description;
  //     initialValues.information.isActive = data.isActive;
      
  //     return renderForm(initialValues);
  //   }
  // }

  return null;
};