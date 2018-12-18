import { FormMode } from '@generic/types';
import { PositionEditorProps } from '@lookup/components/position/editor/PositionEditor';
import { LinearProgress } from '@material-ui/core';
import * as React from 'react';
import { PositionForm, PositionFormData } from './PositionForm';

export const PositionEditorView: React.SFC<PositionEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupPositionState.detail;

  const renderForm = (formData: PositionFormData) => (
    <PositionForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: PositionFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      name: undefined,
      description: undefined,
      inactiveDate: undefined,
      isAllowMultiple: false,
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
        <LinearProgress variant="query" />
      );
    }

    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.name = data.name;
      initialValues.information.description = data.description || '';
      initialValues.information.inactiveDate = data.inactiveDate || '';
      initialValues.information.isAllowMultiple = data.isAllowMultiple;

      return renderForm(initialValues);
    }
  }

  return null;
};