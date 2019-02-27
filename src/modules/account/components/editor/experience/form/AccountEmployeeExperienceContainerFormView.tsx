import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeExperienceContainerFormProps } from './AccountEmployeeExperienceContainerForm';
import { AccountEmployeeExperienceDetailForm } from './AccountEmployeeExperienceDetailForm';

export const AccountEmployeeExperienceContainerFormView: React.SFC<AccountEmployeeExperienceContainerFormProps> = props => {
  const { initialValues, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.experience);

  const componentExperience = (context: BaseFieldsProps) => (
    <AccountEmployeeExperienceDetailForm formMode={formMode} context={context} />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="experience">
            <Fields names={fields} component={componentExperience} />
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