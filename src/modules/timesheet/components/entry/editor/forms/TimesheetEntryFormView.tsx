import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { TimesheetEntryDetailForm } from './TimesheetEntryDetailForm';
import { EntryFormProps } from './TimesheetEntryForm';

export const TimesheetEntryFormView: React.SFC<EntryFormProps> = props => {
  const {
    formMode, isAdmin, activityTypeValue, customerUidValue, isPresalesActivity, isMaintenanceActivity, projectUidValue, formIsSiteProject, minDate
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <TimesheetEntryDetailForm
      formMode={formMode}
      context={context}
      activityTypeValue={activityTypeValue}
      customerUidValue={customerUidValue}
      isAdmin={isAdmin}
      isPresalesActivity={isPresalesActivity}
      isMaintenanceActivity={isMaintenanceActivity}
      projectUidValue={projectUidValue}
      showSiteProject={formIsSiteProject}
      minDate={minDate}
      />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid
        container
        spacing={16}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={4}>
          <FormSection name="information">
            <Fields
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <Submission 
            valid={props.valid}
            reset={props.reset}
            submitting={props.submitting}
            withSubmitDialog={true}
            formName={props.formName}
            submitDialogTitle={props.submitDialogTitle}
            submitDialogContentText={props.submitDialogContentText}
            submitDialogCancelText={props.submitDialogCancelText}
            submitDialogConfirmedText={props.submitDialogConfirmedText}
          />
        </Grid>
      </Grid>
    </form>
  );

  return render;
};