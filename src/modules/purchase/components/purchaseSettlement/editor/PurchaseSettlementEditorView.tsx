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
      uid: undefined,
      date: undefined,
      notes: undefined,
      customerUid: undefined,
      projectUid: undefined,
      currencyType: undefined,
      rate: 0,
      request: 0,
      actual: 0,
      difference: 0,
      
      requestInIDR: 0,
      actualInIDR: 0,
      differenceInIDR: 0,
      
      advance: 0,
      balanceDue: 0,

    },
    items: {
      items: [ 
        // {
        // uid: undefined,
        // description: '',
        // request: 0,
        // actual: 0,
        // variance: 0,
        // }
      ]
    }
  };

  if (isLoading && !response) {
      return (
        <LinearProgress variant="query" />
      );
    }

  if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.notes = data.notes;
      initialValues.information.projectUid = `${data.projectUid} - ${data.project && data.project.name}`;
      initialValues.information.customerUid = data.customer && data.customer.name;
      initialValues.information.rate = data.rate;
      initialValues.information.currencyType = data.currency && data.currency.value;
      initialValues.information.advance = data.advance || 0;
      initialValues.information.request = data.request || 0;
      initialValues.information.requestInIDR = data.requestInIDR || 0;

      if (formMode === FormMode.Edit) {
        initialValues.information.date = data.date;
        initialValues.information.actual = data.actual || 0;
        initialValues.information.difference = data.difference || 0;
        initialValues.information.actualInIDR = data.actualInIDR || 0;
        initialValues.information.differenceInIDR = data.differenceInIDR || 0;
        initialValues.information.balanceDue = data.balanceDue || 0;
      }

      if (data.items) {
            data.items.forEach(item =>
              initialValues.items.items.push({
                uid: item.uid,
                description: item.description,
                request: item.requestValue,
                actual: item.actualValue || 0,
                variance: item.varianceValue || 0,
          })
        );
      }

      return renderForm(initialValues);
    }
  return null;
};