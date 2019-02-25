import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeTrainingContainerFormProps } from './AccountEmployeeTrainingContainerForm';
import { AccountEmployeeTrainingDetailForm } from './AccountEmployeeTrainingDetailForm';

export const AccountEmployeeTrainingContainerFormView: React.SFC<AccountEmployeeTrainingContainerFormProps> = props => {
  const { formMode, initialValues } = props;

  const fields = Object.getOwnPropertyNames(initialValues.training);

  const componentTraining = (context: BaseFieldsProps) => (
    <AccountEmployeeTrainingDetailForm formMode={formMode} context={context} />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="training">
            <Fields names={fields} component={componentTraining} />
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
