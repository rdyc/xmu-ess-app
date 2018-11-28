import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { MileageExceptionContainerForm, MileageExceptionFormData } from './forms/MileageExceptionContainerForm';
import { MileageExceptionEditorProps } from './MileageExceptionEditor';

export const MileageExceptionEditorView: React.SFC<MileageExceptionEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.mileageExceptionState.detail;

  const renderForm = (formData: MileageExceptionFormData) => (
    <MileageExceptionContainerForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
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

      initialValues.information.uid = data.uid;
      initialValues.information.companyUid = data.role.company.name;
      initialValues.information.roleUid = data.role.name;
      initialValues.information.siteType = data.siteType;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.site && data.site.name;
      initialValues.information.percentage = data.percentage;
      initialValues.information.description = data.description;
      initialValues.information.reason = data.reason;
      initialValues.information.inactiveDate = data.inactiveDate;

      return renderForm(initialValues);
    }
  }

  return null;
};