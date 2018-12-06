import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
// import { PurchaseRequestDetail, PurchaseRequestDetailProps } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import { PurchaseSettlementDetailForm } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementDetailForm';
import { PurchaseSettlementFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementForm';
import { PurchaseSettlementItemForm } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const PurchaseSettlementFormView: React.SFC<PurchaseSettlementFormProps> = props => {
  const {
    formMode,
    formIsCurrencyIDR, initialValues
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <PurchaseSettlementDetailForm
      formMode={formMode}
      context={context}
      isCurrencyIdr={formIsCurrencyIDR}
    />
  );

  const componentItems = (context: WrappedFieldArrayProps<any>) => (
  <PurchaseSettlementItemForm
   context= {context} />
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

        <Grid item 
         xs={12}
         md={8}>
          <FormSection name="items">
            <FieldArray
              name="items"
              component={componentItems}
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