import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { LookupSystemLimitContainerForm, SystemLimitFormData } from './forms/LookupSystemLimitContainerForm';
import { SystemLimitEditorProps } from './LookupSystemLimitEditor';

export const LookupSystemLimitEditorView: React.SFC<SystemLimitEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.systemLimitState.detail;

  const renderForm = (formData: SystemLimitFormData) => (
    <LookupSystemLimitContainerForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
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
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.categoryType = data.category && data.category.type;
      initialValues.information.days = data.days;

      return renderForm(initialValues);
    }
  }

  return null;
};