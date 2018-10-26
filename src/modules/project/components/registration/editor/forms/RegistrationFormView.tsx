import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { RegistrationDetailForm } from '@project/components/registration/editor/forms/RegistrationDetailForm';
import { RegistrationDocumentForm } from '@project/components/registration/editor/forms/RegistrationDocumentForm';
import { RegistrationFormProps } from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationSalesForm } from '@project/components/registration/editor/forms/RegistrationSalesForm';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const RegistrationFormView: React.SFC<RegistrationFormProps> = props => {
  const { 
    formMode, formIsProject, formIsPresales, 
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
  
  const componentInformation = (context: BaseFieldsProps) => (
    <RegistrationDetailForm 
      formMode={formMode}
      context={context} 
      isCurrencyIdr={formIsCurrencyIDR}
      formCurrencyType={formCurrencyType}
      onChangeCurrencyType={onChangeCurrencyType}
      onChangeRate={onChangeRate}
      onChangeValueIdr={onChangeValueIdr}
    />
  );

  const componentProjectDocument = (context: WrappedFieldArrayProps<any>) => (
    <RegistrationDocumentForm 
      category="project"
      context={context} 
    />
  );

  const componentPresalesDocument = (context: WrappedFieldArrayProps<any>) => (
    <RegistrationDocumentForm 
      category="preSales"
      context={context} 
    />
  );

  const componentSales = (context: WrappedFieldArrayProps<any>) => (
    <RegistrationSalesForm context={context}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Grid container spacing={16}>
            {(formIsProject || formIsPresales) &&
            <Grid item>
              <FormSection name="document">
                {formIsProject &&
                  <FieldArray
                    name="project"
                    component={componentProjectDocument}
                  />
                }
                
                {formIsPresales &&
                  <FieldArray 
                    name="preSales" 
                    component={componentPresalesDocument}
                  />
                }
              </FormSection>
            </Grid>
            }

            <Grid item>
              <FormSection name="sales">
                <FieldArray 
                  name="employees" 
                  component={componentSales}
                />
              </FormSection>
            </Grid>
          </Grid>
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