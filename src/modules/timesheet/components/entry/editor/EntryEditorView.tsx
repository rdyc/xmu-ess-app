import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import { EntryEditorProps } from '@timesheet/components/entry/editor/EntryEditor';
import {
  EntryForm,
  TimesheetFormData,
} from '@timesheet/components/entry/editor/forms/EntryForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const EntryEditorView: React.SFC<EntryEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.timesheetState.detail;

  const renderForm = (formData: TimesheetFormData) => (
    <EntryForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
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

      initialValues.information.uid = data.uid;
      initialValues.information.activityType = data.activityType;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.date = data.date;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.description = data.description;
          
      return renderForm(initialValues);
    }
  }

  return null;
};