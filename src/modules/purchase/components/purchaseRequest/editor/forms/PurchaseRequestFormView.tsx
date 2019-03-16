import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { PurchaseRequestDetailForm } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestDetailForm';
import { PurchaseRequestFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection } from 'redux-form';
import { PurchaseRequestItemFormView } from './PurchaseRequestItemFormView';

export const PurchaseRequestFormView: React.SFC<PurchaseRequestFormProps> = props => {
  const {
    formMode,
    formCustomer,
    formIsCurrencyIDR, formRate, 
    formRequest,
    formCurrencyType, change, initialValues
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const onChangeCurrencyType = (event: any, newValue: string) => {
    if (newValue === 'SCR01') {
      change('information.rate', 1);
      change('information.requestInIDR', formRequest);
    }
  };

  const onChangeRate = (event: any, newValue: number) => {
    change('information.requestInIDR', newValue * formRequest);
  };

  const onChangeValueIdr = (event: any, newValue: number) => {
    change('information.requestInIDR', newValue * formRate);
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <PurchaseRequestDetailForm
      formMode={formMode}
      context={context}
      isCurrencyIdr={formIsCurrencyIDR}
      formCustomer={formCustomer}
      formCurrencyType={formCurrencyType}
      onChangeCurrencyType={onChangeCurrencyType}
      onChangeRate={onChangeRate}
      onChangeValueIdr={onChangeValueIdr}
      // requestMinDate={requestMinDate}
    />
  );

  // const componentItems = (context: WrappedFieldArrayProps<any>) => (
  // <PurchaseRequestItemForm 
  // context={context}
  // />
  // );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid
        container
        spacing={16}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* <FormSection name="items"> */}
            <FieldArray
              name="items"
              props={props}
              component={PurchaseRequestItemFormView}
            />
          {/* </FormSection> */}
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