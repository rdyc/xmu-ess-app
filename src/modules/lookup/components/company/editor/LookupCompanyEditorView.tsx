import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { LookupCompanyForm, LookupCompanyFormData } from './form/LookupCompanyForm';
import { CompanyEditorProps } from './LookupCompanyEditor';

export const LookupCompanyEditorView: React.SFC<CompanyEditorProps> = props => {
  const { 
    formMode, 
    handleValidate, 
    handleSubmit, 
    handleSubmitSuccess, 
    handleSubmitFail,
    submitDialogTitle, 
    submitDialogContentText, 
    submitDialogConfirmedText, 
    submitDialogCancelText 
  } = props;
  const { isLoading, response } = props.lookupCompanyState.detail;

  const renderForm = (formData: LookupCompanyFormData) => (
    <LookupCompanyForm 
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
  const initialValues: LookupCompanyFormData = {
    information: {
      uid: undefined,
      code: undefined,
      name: undefined,
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
     
      initialValues.information.uid = data.uid;
      initialValues.information.code = data.code;
      initialValues.information.name = data.name;
          
      return renderForm(initialValues);
    }
  }

  return null;
};