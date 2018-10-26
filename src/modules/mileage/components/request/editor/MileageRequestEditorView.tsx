import { FormMode } from '@generic/types';
import {
  MileageRequestForm, MileageRequestFormData
} from '@mileage/components/request/editor/forms/MileageRequestForm';
import { MileageRequestEditorProps } from '@mileage/components/request/editor/MileageRequestEditor';
import * as React from 'react';

export const MileageRequestEditorView: React.SFC<MileageRequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;

  const renderForm = (formData: MileageRequestFormData) => (
    <MileageRequestForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: MileageRequestFormData = {
    information: {
      year: 0,
      month: 0,
    }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  return null;
};