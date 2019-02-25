import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeAccessContainerFormProps } from './AccountEmployeeAccessContainerForm';
import { AccountEmployeeAccessDetailForm } from './AccountEmployeeAccessDetailForm';

export const AccountEmployeeAccessContainerFormView: React.SFC<AccountEmployeeAccessContainerFormProps> = props => {
  const {
    formMode, companyUidValue, unitTypeValue, initialValues
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.access);

  const componentAccess = (context: BaseFieldsProps) => (
    <AccountEmployeeAccessDetailForm 
      formMode={formMode}
      context={context}
      companyUidValue={companyUidValue}
      unitTypeValue={unitTypeValue}
    />
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="access">
            <Fields names={fields} component={componentAccess} />
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