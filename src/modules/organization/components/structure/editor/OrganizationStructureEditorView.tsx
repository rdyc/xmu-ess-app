import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { OrganizationStructureFormData, StructureForm } from './form/StructureForm';
import { OrganizationStructureEditorProps } from './OrganizationStructureEditor';

export const CommonEditorView: React.SFC<OrganizationStructureEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.organizationStructureState.detail;

  const renderForm = (formData: OrganizationStructureFormData) => (
    <StructureForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={props.submitDialogTitle}
      submitDialogContentText={props.submitDialogContentText}
      submitDialogConfirmedText={props.submitDialogConfirmedText}
      submitDialogCancelText={props.submitDialogCancelText}
      
    />
  );

  // init form values
  const initialValues: OrganizationStructureFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      positionUid: undefined,
      inactiveDate: undefined,
      description: undefined,
    },
    items: [{
      uid: undefined,
      positionUid: undefined,
      start: undefined,
      end: undefined 
    }]
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
      initialValues.information.positionUid = data.positionUid;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.inactiveDate = data.inactiveDate;
      initialValues.information.description = data.description;

      if (data.reportTo) {
        initialValues.items = [];
        data.reportTo.forEach(item => 
          initialValues.items.push({
            uid: item.uid,
            positionUid: item.positionUid,
            start: item.start,
            end: item.end
          }));
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};