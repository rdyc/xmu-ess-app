import { IExpenseDetail } from '@expense/classes/response';
import { FormMode } from '@generic/types';
import * as React from 'react';

import { ApprovalEditorProps } from './ApprovalEditor';
import { ApprovalForm, ExpenseApprovalFormData } from './forms/ApprovalForm';

export const ApprovalEditorView: React.SFC<ApprovalEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.expenseApprovalState.detail;

  const renderForm = (formData: ExpenseApprovalFormData, data: IExpenseDetail) => (
    <ApprovalForm
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
  const initialValues: ExpenseApprovalFormData = {
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