import { ExpenseRequestEditorProps } from '@expense/components/request/editor/ExpenseRequestEditor';
import {
  ExpenseRequestFormData,
  RequestForm,
} from '@expense/components/request/editor/forms/RequestForm';
import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';

export const ExpenseRequestEditorView: React.SFC<ExpenseRequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl, handleSetMinDate, minDate,
    submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  const { isLoading, response } = props.expenseRequestState.detail;
  const amountLoading = props.systemLimitState.amount.isLoading;
  const amountResponse = props.systemLimitState.amount.response;

  const renderForm = (formData: ExpenseRequestFormData) => (
    <RequestForm 
      formMode={formMode}
      initialValues={formData}
      minDate={minDate}
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
  const initialValues: ExpenseRequestFormData = {
    information: {
      uid: undefined,
      date: undefined,
      expenseType: undefined,
      customerUid: undefined,
      projectUid: undefined,
      value: 0,
      location: undefined,
      address: undefined,
      name: undefined,
      title: undefined,
      notes: undefined,
    },
  };

  if (amountLoading && !amountResponse) { // do not load the form yet if the amount not loaded
    return (
      <Typography variant="body2">
        {intl.formatMessage(layoutMessage.text.loading)}
      </Typography>
    );
  }

  // New
  if (formMode === FormMode.New) {
    if (!amountLoading && amountResponse && amountResponse.data) {
      handleSetMinDate(amountResponse.data.days);
    }
    
    return renderForm(initialValues);
  }

  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          {intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.date = data.date;
      initialValues.information.expenseType = data.expenseType;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.value = data.value;
      initialValues.information.location = data.location;
      initialValues.information.address = data.address;
      initialValues.information.name = data.client.name;
      initialValues.information.title = data.client.title;
      initialValues.information.notes = data.notes;

      if (!amountLoading && amountResponse && amountResponse.data) {
        handleSetMinDate(amountResponse.data.days, data.changes && data.changes.createdAt);
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};