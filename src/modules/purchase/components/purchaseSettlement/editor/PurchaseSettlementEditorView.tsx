import { FormMode } from '@generic/types';
import { 
  // Typography, 
  LinearProgress } from '@material-ui/core';
import {
  PurchaseSettlementForm,
  PurchaseSettlementFormData,
  // PurchaseSettlementItemFormData
} from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementForm';
import { PurchaseSettlementEditorProps } from '@purchase/components/purchaseSettlement/editor/PurchaseSettlementEditor';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';

export const PurchaseSettlementEditorView: React.SFC<PurchaseSettlementEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.purchaseSettlementState.detail;

  const renderForm = (formData: PurchaseSettlementFormData) => (
    <PurchaseSettlementForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: PurchaseSettlementFormData = {
    information: {
      // uid: string,
      date: undefined,
      notes: undefined,
    },
    items: {
      items: [
    ]
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

      // initialValues.information.uid = data.uid;
      initialValues.information.notes = data.notes;
      initialValues.information.date = data.date;

      if (data.items) {
        data.items.forEach(item =>
          initialValues.items.items.push({
            uid: item.uid,
            amount: item.requestValue
          })
        );
      }

      return renderForm(initialValues);
    }
  }

  return null;
};