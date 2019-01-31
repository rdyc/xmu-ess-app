import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeBankForm } from './AccountEmployeeBankForm';
import { AccountEmployeeContactForm } from './AccountEmployeeContactForm';
import { AccountEmployeeContainerFormProps } from './AccountEmployeeContainerForm';
import { AccountEmployeeDetailForm } from './AccountEmployeeDetailForm';
import { AccountEmployeeImageForm } from './AccountEmployeeImageForm';

export const AccountEmployeeContainerFormView: React.SFC<
  AccountEmployeeContainerFormProps
> = props => {
  const { formMode, initialValues, companyUidValue } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);
  const fieldsBank = Object.getOwnPropertyNames(initialValues.bank);
  const fieldsContact = Object.getOwnPropertyNames(initialValues.contact);
  const fieldsImage = Object.getOwnPropertyNames(initialValues.image);

  const componentInformation = (context: BaseFieldsProps) => (
    <AccountEmployeeDetailForm formMode={formMode} context={context} companyUidValue={companyUidValue}/>
  );

  const componentBank = (context: BaseFieldsProps) => (
    <AccountEmployeeBankForm formMode={formMode} context={context} />
  );

  const componentContact = (context: BaseFieldsProps) => (
    <AccountEmployeeContactForm formMode={formMode} context={context} />
  );

  const componentImage = (context: BaseFieldsProps) => (
    <AccountEmployeeImageForm formMode={formMode} context={context}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <FormSection name="information">
            <Fields names={fields} component={componentInformation} />
          </FormSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormSection name="bank">
            <Fields names={fieldsBank} component={componentBank} />
          </FormSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormSection name="contact">
            <Fields names={fieldsContact} component={componentContact} />
          </FormSection>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormSection name="image">
            <Fields names={fieldsImage} component={componentImage} type="file"/>
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
