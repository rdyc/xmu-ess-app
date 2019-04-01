import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import {
  LookupHolidayForm,
  LookupHolidayFormData,
} from '@lookup/components/holiday/editor/forms/LookupHolidayForm';
import { RequestEditorProps } from '@lookup/components/holiday/editor/LookupHolidayEditor';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';

export const LookupHolidayEditorView: React.SFC<RequestEditorProps> = props => {
  const {  
    formMode, 
    handleValidate, 
    handleSubmit, 
    handleSubmitSuccess, 
    handleSubmitFail,
    submitDialogTitle, 
    submitDialogContentText, 
    submitDialogConfirmedText, 
    submitDialogCancelText  } = props;
  const { isLoading, response } = props.lookupHolidayState.detail;

  const renderForm = (formData: LookupHolidayFormData) => (
    <LookupHolidayForm 
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
  const initialValues: LookupHolidayFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      description: undefined,
      date: undefined,
    },
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
      initialValues.information.description = data.description;
      initialValues.information.date = data.date;
      
      return renderForm(initialValues);
    }
  }
  return null;
};