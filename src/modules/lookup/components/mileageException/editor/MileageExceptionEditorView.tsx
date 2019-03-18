import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { MileageExceptionContainerForm, MileageExceptionFormData } from './forms/MileageExceptionContainerForm';
import { MileageExceptionEditorProps } from './MileageExceptionEditor';

export const MileageExceptionEditorView: React.SFC<MileageExceptionEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, submitDialogTitle,
  submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText } = props;
  const { isLoading, response } = props.mileageExceptionState.detail;

  const renderForm = (formData: MileageExceptionFormData) => (
    <MileageExceptionContainerForm 
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
  const initialValues: MileageExceptionFormData = {
    // companyUid: undefined,
    information: {
      uid: undefined,
      companyUid: undefined,
      roleUid: undefined,
      siteType: undefined,
      projectUid: undefined,
      siteUid: undefined,
      percentage: 0,
      description: undefined,
      reason: undefined,
      inactiveDate: undefined
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
      initialValues.information.companyUid = data.role.companyUid;
      initialValues.information.roleUid = data.roleUid;
      initialValues.information.siteType = data.siteType;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.percentage = data.percentage;
      initialValues.information.description = data.description;
      initialValues.information.reason = data.reason;
      initialValues.information.inactiveDate = data.inactiveDate;

      return renderForm(initialValues);
    }
  }

  return null;
};