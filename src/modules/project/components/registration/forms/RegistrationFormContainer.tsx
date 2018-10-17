import { ProjectType } from '@common/classes/types';
import { Grid } from '@material-ui/core';
import DocumentForm from '@project/components/registration/forms/DocumentForm';
import { InformationForm } from '@project/components/registration/forms/InformationForm';
import { SalesForm } from '@project/components/registration/forms/SalesForm';
import { SubmitForm } from '@project/components/registration/forms/SubmitForm';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  BaseFieldsProps,
  FieldArray,
  Fields,
  FormSection,
  formValueSelector,
  InjectedFormProps,
  reduxForm,
  WrappedFieldArrayProps,
} from 'redux-form';

export type ProjectDocumentFormData = {
  uid: string;
  documentType: string;
  isChecked: boolean;
};

export type ProjectSalesFormData = {
  uid: string;
  employeeUid: string;
};

export type ProjectRegistrationFormData = {
  information: {
    customerUid: string | undefined;
    projectType: string | undefined;
    contractNumber: string | undefined;
    name: string | undefined;
    description: string | undefined;
    start: string | undefined;
    end: string | undefined;
    currencyType: string | undefined;
    rate: number | 1;
    valueUsd: number | 1;
    valueIdr: number | 1;
  },
  document: {
    project: ProjectDocumentFormData[], 
    preSales: ProjectDocumentFormData[],
  }, 
  sales: {
    employees: ProjectSalesFormData[]
  }
};

const formName = 'projectRegistration';

interface FormValueProps {
  formIsProject: boolean | false;
  formIsPresales: boolean | false;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | undefined;
  formRate: number | 1;
  formValueUsd: number | 1;
}

type AllProps = InjectedFormProps<ProjectRegistrationFormData> & FormValueProps;

const registrationFormContainer: React.SFC<AllProps> = props => {
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
    <SalesForm context={context}/>
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
          <SubmitForm {...props}/>
        </Grid>
      </Grid>
    </form>
  );

  return render;
};

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const projectType = selector(state, 'information.projectType');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const valueUsd = selector(state, 'information.valueUsd');
  
  return {
    formIsProject: projectType === ProjectType.Project,
    formIsPresales: projectType === ProjectType.PreSales,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValueUsd: valueUsd 
  };
};

export const RegistrationFormContainer = reduxForm<ProjectRegistrationFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(connect(mapStateToProps)(registrationFormContainer));