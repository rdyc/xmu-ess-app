import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { RequestFormProps } from '@travel/components/request/editor/forms/RequestForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';
import { RequestDetailForm } from './RequestDetailForm';
import { RequestItemForm } from './RequestItemForm';

export const RequestFormView: React.SFC<RequestFormProps> = props => {
  const {
    formMode, customerUidValue, projectUidValue, 
    destinationtypeValue, isProjectSelected, diemRequest,
    change, TotalCost, totalTravel
  } = props;
  
  const diem = (diemRequest) ? 
                  diemRequest.filter(item => item.destinationType === destinationtypeValue &&
                    item.projectType === props.projectType)[0] 
                  : undefined;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);
                
  const onChangeProject = (event: any, newValue: string, oldValue: string) => {
    if (newValue) {
      change('item.items[0].currencyUid', (diem && diem.currency ? diem.currency.name : ''));
      change('item.items[0].currencyRate', (diem && diem.currency ? diem.currency.rate : 0));
      change('item.items[0].diemValue', (diem ? diem.value : 0));
    }    
  };

  const onChangeDestinationType = (event: any, newValue: string, oldValue: string) => {
    if (newValue && projectUidValue) {
      change('item.items[0].currencyUid', (diem && diem.currency ? diem.currency.name : ''));
      change('item.items[0].currencyRate', (diem && diem.currency ? diem.currency.rate : 0));
      change('item.items[0].diemValue', (diem ? diem.value : 0));
    }
  };

  const onCostChange = (event: any, newValue: number, oldValue: number) => {
    if (newValue) {
      change('information.total', (totalTravel - oldValue) + newValue);
    }
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <RequestDetailForm 
      formMode={formMode}
      context={context}
      onChangeProject={onChangeProject}
      onChangeDestinationType={onChangeDestinationType}
      customerUidValue={customerUidValue}
      projectUidValue={projectUidValue}
      destinationTypeValue= {destinationtypeValue}
      isProjectSelected= {isProjectSelected}
      totalCostValue= {TotalCost}
      handleProjectChange={props.handleProjectChange}

    />    
  );

  const componentTravelItem = (context: WrappedFieldArrayProps<any>) => (
    <RequestItemForm 
      context={context}
      diemRequest={diemRequest}
      destinationTypeValue={destinationtypeValue}
      projectTypeValue={props.projectType}
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
              component={componentTravelItem}
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