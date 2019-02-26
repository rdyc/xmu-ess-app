import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeFamilyFormProps } from './AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyDetailForm } from './AccountEmployeeFamilyDetailForm';

export const AccountEmployeeFamilyContainerFormView: React.SFC<
  AccountEmployeeFamilyFormProps
> = props => {
  const { initialValues, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.family);

  const componentFamily = (context: BaseFieldsProps) => (
    <AccountEmployeeFamilyDetailForm formMode={formMode} context={context}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="family">
            <Fields names={fields} component={componentFamily} />
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