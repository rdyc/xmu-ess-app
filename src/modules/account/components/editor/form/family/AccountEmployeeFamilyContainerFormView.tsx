import { AccountEmployeeFamilyFormProps } from '@account/components/editor/form/family/AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyForm } from '@account/components/editor/form/family/AccountEmployeeFamilyForm';
import { Submission } from '@layout/components/submission/Submission';
import {
  // Card, CardContent, CardHeader, 
  Grid
} from '@material-ui/core';
import * as React from 'react';
import { FieldArray, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const AccountEmployeeFamilyContainerFormView: React.SFC<AccountEmployeeFamilyFormProps> = props => {
  const {
    formMode,
    formCustomer,
    formIsCurrencyIDR, formRate,
    formRequest,
    formCurrencyType, change, initialValues,
    // requestMinDate
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const onChangeCurrencyType = (event: any, newValue: string, oldValue: string) => {
    if (newValue === 'SCR01') {
      change('information.rate', 1);
      change('information.requestInIDR', formRequest);
    }
  };

  const onChangeRate = (event: any, newValue: number, oldValue: number) => {
    change('information.requestInIDR', newValue * formRequest);
  };

  const onChangeValueIdr = (event: any, newValue: number, oldValue: number) => {
    change('information.requestInIDR', newValue * formRate);
  };

  const componentInformation = (context: WrappedFieldArrayProps<any>) => (
    <AccountEmployeeFamilyForm
      context={context}
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
        <Grid container spacing={16} item xs={12} md={8}>
          <FormSection name="information">
            <FieldArray
              name="information"
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item md={4}>
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