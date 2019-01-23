import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { LookupDiemForm, LookupDiemFormData } from './form/LookupDiemForm';
import { LookupDiemEditorProps } from './LookupDiemEditor';

export const LookupDiemEditorView: React.SFC<LookupDiemEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
          submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText  } = props;
  const { isLoading, response } = props.lookupDiemState.detail;

  const renderForm = (formData: LookupDiemFormData) => (
    <LookupDiemForm
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
  const initialValues: LookupDiemFormData = {
    information: {
      // uid: undefined,
      companyUid: undefined,
      currencyUid: undefined,
      projectType: undefined,
      destinationType: undefined,
      value: 0
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

      // initialValues.information.uid = data.uid;     
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.currencyUid = data.currencyUid;
      initialValues.information.projectType = data.projectType;
      initialValues.information.destinationType = data.destinationType;
      initialValues.information.value = data.value;          
      
      return renderForm(initialValues);
    }
  }

  return null;
};