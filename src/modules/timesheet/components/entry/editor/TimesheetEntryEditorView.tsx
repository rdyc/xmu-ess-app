import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import {
  TimesheetEntryForm,
  TimesheetFormData,
} from '@timesheet/components/entry/editor/forms/TimesheetEntryForm';
import { EntryEditorProps } from '@timesheet/components/entry/editor/TimesheetEntryEditor';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const TimesheetEntryEditorView: React.SFC<EntryEditorProps> = props => {
  const { 
    formMode, 
    handleValidate, 
    handleSubmit, 
    handleSubmitSuccess, 
    handleSubmitFail, 
    intl, 
    submitDialogTitle, 
    submitDialogContentText, 
    submitDialogConfirmedText, 
    submitDialogCancelText
  } = props;
  const { isLoading, response } = props.timesheetEntryState.detail;

  const renderForm = (formData: TimesheetFormData) => (
    <TimesheetEntryForm 
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
  const initialValues: TimesheetFormData = {
    information: {
      uid: undefined,
      activityType: undefined,
      customerUid: undefined,
      projectUid: undefined,
      siteUid: undefined,
      date: undefined,
      start: undefined,
      end: undefined,
      description: undefined
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
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      const start = intl.formatDate(data.start, {
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'GMT',
      });
      const end = intl.formatDate(data.end, {
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'GMT',
      });
      
      initialValues.information.uid = data.uid;
      initialValues.information.activityType = data.activityType;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.date = data.date;
      initialValues.information.start = start;
      initialValues.information.end = end;
      initialValues.information.description = data.description;
          
      return renderForm(initialValues);
    }
  }

  return null;
};