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
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.expenseRequestState.detail;

  const renderForm = (formData: ExpenseRequestFormData) => (
    <RequestForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
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

  // New
  if (formMode === FormMode.New) {
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
      
      return renderForm(initialValues);
    }
  }

  return null;
};