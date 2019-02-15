import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import {
  LeaveForm,
  LookupLeaveFormData,
} from '@lookup/components/leave/editor/forms/LookupLeaveForm';
import { RequestEditorProps } from '@lookup/components/leave/editor/LookupLeaveEditor';
import { Typography } from '@material-ui/core';
import * as React from 'react';

export const LookupLeaveEditorView: React.SFC<RequestEditorProps> = props => {
  const {     formMode, 
    handleValidate, 
    handleSubmit, 
    handleSubmitSuccess, 
    handleSubmitFail,
    submitDialogTitle, 
    submitDialogContentText, 
    submitDialogConfirmedText, 
    submitDialogCancelText  } = props;
  const { isLoading, response } = props.lookupLeaveState.detail;

  const renderForm = (formData: LookupLeaveFormData) => (
    <LeaveForm 
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
  const initialValues: LookupLeaveFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      categoryType: undefined,
      year: undefined,
      name: undefined,
      allocation: 0,
      isWithinHoliday: undefined,
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
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.categoryType = data.categoryType;
      initialValues.information.year = data.year;
      initialValues.information.name = data.name;
      initialValues.information.allocation = data.allocation;
      initialValues.information.isWithinHoliday = data.isWithinHoliday;
      
      return renderForm(initialValues);
    }
  }
  return null;
};