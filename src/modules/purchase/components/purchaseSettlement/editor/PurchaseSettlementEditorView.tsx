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
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.rate = data.rate;
      initialValues.information.currencyType = data.currencyType;
      initialValues.information.advance = data.advance;
      initialValues.information.request = data.request;
      initialValues.information.requestInIDR = data.requestInIDR;

      if (formMode === FormMode.Edit) {
        initialValues.information.date = data.date;
        initialValues.information.actual = data.actual;
        initialValues.information.difference = data.difference;
        initialValues.information.actualInIDR = data.actualInIDR;
        initialValues.information.differenceInIDR = data.differenceInIDR;
        initialValues.information.balanceDue = data.balanceDue;
      }

      if (data.items) {
            data.items.forEach(item =>
              initialValues.items.items.push({
                uid: item.uid,
                description: item.description,
                request: item.requestValue,
                actual: (formMode === FormMode.New ? 0 : item.actualValue),
                variance: (formMode === FormMode.New ? 0 : item.varianceValue),
          })
        );
      }

      return renderForm(initialValues);
    }
  return null;
};