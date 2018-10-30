import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { PurchaseRequestDetailForm } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestDetailForm';
import { PurchaseRequestFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestItemForm } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const PurchaseRequestFormView: React.SFC<PurchaseRequestFormProps> = props => {
  const {
    formMode,
    formIsCurrencyIDR, formRate, formValue,
    formCurrencyType, change, initialValues
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const onChangeCurrencyType = (event: any, newValue: string, oldValue: string) => {
    if (newValue === 'SCR01') {
      change('information.rate', 1);
      change('information.valueIdr', formValue);
    }
  };

  const onChangeRate = (event: any, newValue: number, oldValue: number) => {
    change('information.valueIdr', newValue * formValue);
  };

  const onChangeValueIdr = (event: any, newValue: number, oldValue: number) => {
    change('information.valueIdr', newValue * formRate);
  };

  // const onChangeValueRequest = (event: any, newValue: number, oldValue: number) => {
  //   change('information.value', newValue * formRate);
  // };

  const componentInformation = (context: BaseFieldsProps) => (
    <PurchaseRequestDetailForm
      formMode={formMode}
      context={context}
      isCurrencyIdr={formIsCurrencyIDR}
      formCurrencyType={formCurrencyType}
      onChangeCurrencyType={onChangeCurrencyType}
      onChangeRate={onChangeRate}
      onChangeValueIdr={onChangeValueIdr}
    />
  );

  const componentItems = (context: WrappedFieldArrayProps<any>) => (
  <PurchaseRequestItemForm context={context} />
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
        <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormSection name="items">
            <FieldArray
              name="items"
              component={componentItems}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <Submission
            valid={props.valid}
            reset={props.reset}
            submitting={props.submitting}
          />
        </Grid>
      </Grid>
    </form>
  );

  return render;
};