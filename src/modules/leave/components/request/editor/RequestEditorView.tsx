import { FormMode } from '@generic/types';
import {
  LeaveRequestFormData,
  RequestForm,
} from '@leave/components/request/editor/forms/RequestForm';
import { RequestEditorProps } from '@leave/components/request/editor/RequestEditor';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RequestEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.leaveRequestState.detail;

  const renderForm = (formData: LeaveRequestFormData) => (
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
  const initialValues: LeaveRequestFormData = {
    information: {
      uid: undefined,
      leaveType: undefined,
      regularType: undefined,
      start: undefined,
      end: undefined,
      address: undefined,
      contactNumber: undefined,
      reason: undefined,
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
      initialValues.information.leaveType = data.leaveType;
      initialValues.information.regularType = data.regularType || null;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.address = data.address;
      initialValues.information.contactNumber = data.contactNumber;
      initialValues.information.reason = data.reason;
      
      return renderForm(initialValues);
    }
  }
  return null;
};