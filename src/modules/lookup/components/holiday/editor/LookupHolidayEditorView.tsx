import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import {
  HolidayForm,
  LookupHolidayFormData,
} from '@lookup/components/holiday/editor/forms/LookupHolidayForm';
import { RequestEditorProps } from '@lookup/components/holiday/editor/LookupHolidayEditor';
import { Typography } from '@material-ui/core';
import * as React from 'react';

export const LookupHolidayEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupHolidayState.detail;

  const renderForm = (formData: LookupHolidayFormData) => (
    <HolidayForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
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
      initialValues.information.description = data.description;
      initialValues.information.date = data.date;
      
      return renderForm(initialValues);
    }
  }
  return null;
};