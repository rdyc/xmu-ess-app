import {
  ExpenseRequestFormData,
  RequestForm,
} from '@expense/components/request/editor/forms/RequestForm';
import { RequestEditorProps } from '@expense/components/request/editor/RequestEditor';
import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RequestEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
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
      client: {
        name: undefined,
        title: undefined,
      },
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
          <FormattedMessage id="global.loading"/>
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
      initialValues.information.client.name = data.client.name;
      initialValues.information.client.title = data.client.title;
      initialValues.information.notes = data.notes;
      
      return renderForm(initialValues);
    }
  }

  return null;
};