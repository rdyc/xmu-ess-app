import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { HierarchyForm, OrganizationHierarchyFormData } from './forms/HierarchyForm';
import { OrganizationHierarchyEditorProps } from './OrganizationHierarchyEditor';

export const CommonEditorView: React.SFC<OrganizationHierarchyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  const { isLoading, response } = props.organizationHierarchyState.detail;

  const renderForm = (formData: OrganizationHierarchyFormData) => (
    <HierarchyForm 
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
  const initialValues: OrganizationHierarchyFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      name: undefined,
      description: undefined,
      inactiveDate: undefined,
    },
    items: [
      {
        uid: undefined,
        sequence: 1,
        positionUid: undefined,
        relationType: undefined
      }
    ]
    // item: {
    // }
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
      initialValues.information.name = data.name;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.description = data.description;
      initialValues.information.inactiveDate = data.inactiveDate;

      if (data.items) {
        initialValues.items = [];
        data.items.forEach(item => 
          initialValues.items.push({
            uid: item.uid,
            sequence: item.level,
            positionUid: item.positionUid,
            relationType: item.relationType
          }));
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};