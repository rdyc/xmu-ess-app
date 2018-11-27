import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';

import { TravelSettlementDetailForm } from './TravelSettlementDetailForm';
import { TravelSettlementFormProps } from './TravelSettlementForm';
import { TravelSettlementItemForm } from './TravelSettlementItemForm';

export const TravelSettlementFormView: React.SFC<TravelSettlementFormProps> = props => {
  const {
    formMode, totalCostValue
  } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const onCostChange = (event: any, newValue: number, oldValue: number) => {
    if (newValue) {
      props.change('information.total', (totalCostValue - oldValue) + newValue);
    }
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <TravelSettlementDetailForm
      formMode={formMode}
      context={context}
    />    
  );

  const componentTravelSettlementItem = (context: WrappedFieldArrayProps<any>) => (
    <TravelSettlementItemForm 
      context={context}
      onCostChange={onCostChange}
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
        <Grid item xs={12} md={4} >
        <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormSection name="item">
            <FieldArray 
              name="items" 
              component={componentTravelSettlementItem}
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