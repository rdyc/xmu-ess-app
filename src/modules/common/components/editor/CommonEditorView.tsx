import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { CommonEditorProps } from './CommonEditor';
import { CommonForm, CommonFormData } from './forms/CommonForm';

export const CommonEditorView: React.SFC<CommonEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl, match,
    submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  const { isLoading, response } = props.commonSystemState.detail;

  const renderForm = (formData: CommonFormData) => (
    <CommonForm 
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
  const initialValues: CommonFormData = {
    information: {
      companyUid: undefined,
      parentCode: undefined,
      name: undefined,
      description: undefined,
      isActive: false,
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
          {intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.name = data.name;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.parentCode = data.parentCode;
      initialValues.information.description = data.description;
      initialValues.information.isActive = data.isActive;
      
      return renderForm(initialValues);
    }
  }

  return null;
};