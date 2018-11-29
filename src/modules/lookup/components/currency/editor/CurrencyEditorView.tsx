import { FormMode } from '@generic/types';
import { CurrencyEditorProps } from '@lookup/components/currency/editor/CurrencyEditor';
import { LinearProgress } from '@material-ui/core';
import * as React from 'react';
import { CurrencyForm, CurrencyFormData } from './CurrencyForm';

export const CurrencyEditorView: React.SFC<CurrencyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupCurrencyState.detail;

  const renderForm = (formData: CurrencyFormData) => (
    <CurrencyForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: CurrencyFormData = {
    information: {
      uid: undefined,
      name: undefined,
      symbol: undefined,
      rate: 1,
      isActive: false,
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
      initialValues.information.name = data.name;
      initialValues.information.symbol = data.symbol;
      initialValues.information.rate = data.rate || 1;
      initialValues.information.isActive = data.isActive;

      return renderForm(initialValues);
    }
  }

  return null;
};