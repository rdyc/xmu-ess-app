import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeEducationContainerProps } from './AccountEmployeeEducationContainer';
import { AccountEmployeeEducationDetailForm } from './AccountEmployeeEducationDetailForm';

export const AccountEmployeeEducationContainerView: React.SFC<AccountEmployeeEducationContainerProps> = props => {
  const { initialValues, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.education);

  const componentEducation = (context: BaseFieldsProps) => (
    <AccountEmployeeEducationDetailForm formMode={formMode}  context={context} />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="education">
            <Fields names={fields} component={componentEducation} />
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