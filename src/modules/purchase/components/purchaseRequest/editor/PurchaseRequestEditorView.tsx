import { FormMode } from '@generic/types';
import { 
  // Typography, 
  LinearProgress } from '@material-ui/core';
import {
  PurchaseRequestForm,
  PurchaseRequestFormData,
  // PurchaseRequestItemFormData
} from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestEditorProps } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';

export const PurchaseRequestEditorView: React.SFC<PurchaseRequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.purchaseRequestState.detail;

  const renderForm = (formData: PurchaseRequestFormData) => (
    <PurchaseRequestForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: PurchaseRequestFormData = {
    information: {
      uid: undefined,
      customerUid: undefined,
      projectUid: undefined,
      advance: 0,
      date: undefined,
      currencyType: undefined,
      rate: 1,
      request: 0,
      notes: undefined,
    },
    items: {
      items: [
      //   {
      //   uid: undefined,
      //   description: '',
      //   request: 0
      // }
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

      initialValues.information.uid = data.uid;
      initialValues.information.notes = data.notes;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.date = data.date;
      initialValues.information.currencyType = data.currencyType;
      initialValues.information.rate = data.rate;
      initialValues.information.request = data.request;
      initialValues.information.advance = data.advance;

      if (data.items) {
        data.items.forEach(item =>
          initialValues.items.items.push({
            uid: item.uid,
            description: item.description ? item.description : '',
            request: item.requestValue
          })
        );
      }

      return renderForm(initialValues);
    }
  }

  return null;
};