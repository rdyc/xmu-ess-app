import { FormMode } from '@generic/types';
import * as React from 'react';
import { GalleryContainerForm, GalleryFormData } from './form/GalleryContainerForm';
import { GalleryEditorProps } from './GalleryEditor';

export const GalleryEditorView: React.SFC<GalleryEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, submitDialogTitle,
  submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText } = props;
  // const { isLoading, response } = props.imageGalleryState.detail;

  const renderForm = (formData: GalleryFormData) => (
    <GalleryContainerForm 
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
  const initialValues: GalleryFormData = {
    // companyUid: undefined,
    files: {
      file: undefined
    }
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
  //         {props.intl.formatMessage(layoutMessage.text.loading)}
  //       </Typography>
  //     );
  //   }
    
  //   if (!isLoading && response && response.data) {
  //     // todo: replace values with response data
  //     const data = response.data;

  //     initialValues.information.uid = data.uid;
  //     initialValues.information.companyUid = data.role.companyUid;
  //     initialValues.information.roleUid = data.roleUid;
  //     initialValues.information.siteType = data.siteType;
  //     initialValues.information.projectUid = data.projectUid;
  //     initialValues.information.siteUid = data.siteUid;
  //     initialValues.information.percentage = data.percentage;
  //     initialValues.information.description = data.description;
  //     initialValues.information.reason = data.reason;
  //     initialValues.information.inactiveDate = data.inactiveDate;

  //     return renderForm(initialValues);
  //   }
  // }

  return null;
};