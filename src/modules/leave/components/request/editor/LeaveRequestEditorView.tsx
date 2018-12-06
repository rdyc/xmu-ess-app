import { FormMode } from '@generic/types';
import {
  LeaveRequestFormData,
  RequestForm,
} from '@leave/components/request/editor/forms/LeaveRequestForm';
import { RequestEditorProps } from '@leave/components/request/editor/LeaveRequestEditor';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const LeaveRequestEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  const { isLoading, response } = props.leaveRequestState.detail;

  const renderForm = (formData: LeaveRequestFormData) => (
    <RequestForm 
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
  const initialValues: LeaveRequestFormData = {
    information: {
      uid: undefined,
      leaveType: undefined,
      regularType: undefined,
      start: undefined,
      end: undefined,
      address: undefined,
      contactNumber: '0',
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
      initialValues.information.regularType = data.regular ? data.regular.leaveUid : null ;
      initialValues.information.start = data.start;
      initialValues.information.end = data.regular === null ? data.end : data.start;
      initialValues.information.address = data.address;
      initialValues.information.contactNumber = data.contactNumber;
      initialValues.information.reason = data.reason;
      
      return renderForm(initialValues);
    }
  }
  return null;
};