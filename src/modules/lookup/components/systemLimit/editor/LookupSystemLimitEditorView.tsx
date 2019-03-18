import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { LookupSystemLimitContainerForm, SystemLimitFormData } from './forms/LookupSystemLimitContainerForm';
import { SystemLimitEditorProps } from './LookupSystemLimitEditor';

export const LookupSystemLimitEditorView: React.SFC<SystemLimitEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
  submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.systemLimitState.detail;

  const renderForm = (formData: SystemLimitFormData) => (
    <LookupSystemLimitContainerForm 
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

  // init form values & PENEMPATAN POSISI FORM
  const initialValues: SystemLimitFormData = {
    // companyUid: undefined,
    information: {
      uid: undefined,
      companyUid: undefined,
      categoryType: undefined,
      days: 0
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
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.categoryType = data.category && data.category.type;
      initialValues.information.days = data.days;

      return renderForm(initialValues);
    }
  }

  return null;
};