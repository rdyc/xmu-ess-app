import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import {
  PurchaseRequestForm,
  PurchaseRequestFormData,
} from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestEditorProps } from '@purchase/components/purchaseRequest/editor/PurchaseRequestEditor';
import * as React from 'react';

export const PurchaseRequestEditorView: React.SFC<PurchaseRequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, 
    handleSubmitFail, submitDialogTitle, submitDialogContentText, 
    submitDialogCancelText, submitDialogConfirmedText 
  } = props;
  const { isLoading, response } = props.purchaseRequestState.detail;

  const renderForm = (formData: PurchaseRequestFormData) => (
    <PurchaseRequestForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={submitDialogTitle}
      submitDialogContentText={submitDialogContentText}
      submitDialogCancelText={submitDialogCancelText}
      submitDialogConfirmedText={submitDialogConfirmedText}
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
      currencyType: 'SCR01',
      rate: 1,
      request: 0,
      requestInIDR: 0,
      notes: undefined,
    },
    // items: {
    items: [
      {
        uid: undefined,
        request: 0,
        description: '',
      }
    ]
    // }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading) {
      return (
        <div className={props.classes.preloader}>
          <div className={props.classes.preloaderContent}>
            <CircularProgress 
              style={{margin: 'auto'}} 
              color="secondary"
            />

            <Typography
              className={props.classes.marginFarTop}
            >
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          </div>    
        </div>
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
      initialValues.information.rate = data.rate || 1;
      initialValues.information.request = data.request || 0;
      initialValues.information.requestInIDR = data.requestIDR || 0;
      initialValues.information.advance = data.advance || 0;

      if (data.items) {
        initialValues.items = [];
        data.items.forEach(item =>
          initialValues.items.push({
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