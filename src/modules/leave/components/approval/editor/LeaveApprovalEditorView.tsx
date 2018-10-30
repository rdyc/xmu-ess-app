import { FormMode } from '@generic/types';
import { ILeaveRequestDetail } from '@leave/classes/response';
import * as React from 'react';
import { LeaveApprovalForm, LeaveApprovalFormData } from './forms/LeaveApprovalForm';
import { LeaveApprovalEditorProps } from './LeaveApprovalEditor';

export const LeaveApprovalEditorView: React.SFC<LeaveApprovalEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.leaveApprovalState.detail;

  const renderForm = (formData: LeaveApprovalFormData, data: ILeaveRequestDetail) => (
    <LeaveApprovalForm
      formMode={formMode}
      detailData={data}
      intl={intl}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: LeaveApprovalFormData = {
    information: {
      isApproved: undefined,
      remark: undefined
    }
  };

  if (formMode === FormMode.New) {
    if (!isLoading && response && response.data) {
      
      return renderForm(initialValues, response.data);
    }
  }
  
  return null;
};