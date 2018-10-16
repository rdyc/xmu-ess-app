import { Grid } from '@material-ui/core';
import DocumentForm from '@project/components/registration/editor/forms/DocumentForm';
import { InformationForm } from '@project/components/registration/editor/forms/InformationForm';
import { RegistrationFormProps } from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationSalesForm } from '@project/components/registration/editor/forms/RegistrationSalesForm';
import { SubmissionFormView } from '@project/components/registration/editor/forms/SubmissionFormView';
import * as React from 'react';
import { BaseFieldsProps, FieldArray, Fields, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const RegistrationFormView: React.SFC<RegistrationFormProps> = props => {
  const { formIsProject, formIsPresales, formIsCurrencyIDR, formRate, formValueUsd, formCurrencyType, change } = props;

  const handleChangeCurrencyType = (event: any, newValue: string, oldValue: string) => {
    if (newValue === 'SCR01') {
      change('information.rate', 1);
      change('information.valueIdr', formValueUsd);
    }
  };

  const handleChangeRate = (event: any, newValue: number, oldValue: number) => {
    change('information.valueIdr', newValue * formValueUsd);
  };

  const handleChangeValueIdr = (event: any, newValue: number, oldValue: number) => {
    change('information.valueIdr', newValue * formRate);
  };
  
  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <InformationForm 
      context={context} 
      isCurrencyIdr={formIsCurrencyIDR}
      formCurrencyType={formCurrencyType}
      onChangeCurrencyType={handleChangeCurrencyType}
      onChangeRate={handleChangeRate}
      onChangeValueIdr={handleChangeValueIdr}
    />
  );

  const componentProjectDocument = (context: WrappedFieldArrayProps<any>) => (
    <DocumentForm 
      category="project"
      context={context} 
    />
  );

  const componentPresalesDocument = (context: WrappedFieldArrayProps<any>) => (
    <DocumentForm 
      category="preSales"
      context={context} 
    />
  );

  const componentSales = (context: WrappedFieldArrayProps<any>) => (
    <RegistrationSalesForm context={context}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={24} direction="row">
        <Grid item xs={12} md={4} >
          <FormSection name="information">
            <Fields 
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>
        
        {(formIsProject || formIsPresales) &&
        <Grid item xs={12} md={4}>
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

        <Grid item xs={12} md={4}>
          <FormSection name="sales">
            <FieldArray 
              name="employees" 
              component={componentSales}
            />
          </FormSection>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <SubmissionFormView {...props}/>
        </Grid>
      </Grid>
    </form>
  );

  return render;
};