import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Typography } from '@material-ui/core';
import { TimesheetEntryForm, TimesheetFormData } from '@timesheet/components/entry/editor/forms/TimesheetEntryForm';
import { EntryEditorProps } from '@timesheet/components/entry/editor/TimesheetEntryEditor';
import * as moment from 'moment';
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
    handleSetMinDate, 
    minDate, 
    submitDialogTitle, 
    submitDialogContentText, 
    submitDialogConfirmedText, 
    submitDialogCancelText
  } = props;
  const { isLoading, response } = props.timesheetEntryState.detail;
  const amountLoading = props.systemLimitState.amount.isLoading;
  const amountResponse = props.systemLimitState.amount.response;

  const renderForm = (formData: TimesheetFormData) => (
    <TimesheetEntryForm 
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
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      const start = intl.formatDate(data.start, GlobalFormat.TimeDate);
      const end = intl.formatDate(data.end, GlobalFormat.TimeDate);
      
      initialValues.information.uid = data.uid;
      initialValues.information.activityType = data.activityType;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.date = data.date;
      initialValues.information.start = moment(start).format();
      initialValues.information.end = moment(end).format();
      initialValues.information.description = data.description;

      if (!amountLoading && amountResponse && amountResponse.data) {
        handleSetMinDate(amountResponse.data.days, data.changes && data.changes.createdAt);
      }
          
      return renderForm(initialValues);
    }
  }

  return null;
};