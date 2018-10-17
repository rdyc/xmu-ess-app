// import { ExpenseType } from '@common/classes/types';
import { InformationForm } from '@expense/components/request/forms/InformationForm';
import { SubmitForm } from '@expense/components/request/forms/SubmitForm';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  BaseFieldsProps,
  Fields,
  FormSection,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

export type ExpenseFormData = {
  information: {
    customerUid: string | undefined;
    projectUid: string | undefined;
    date: string | undefined;
    expenseType: string | undefined;
    value: number | undefined;
    location: string | undefined;
    address: string | undefined;
    name: string | undefined;
    title: string | undefined;
    notes: string | undefined;
  },
};

const formName = 'expense';

type AllProps = InjectedFormProps<ExpenseFormData>;

const requestFormContainer: React.SFC<AllProps> = props => {

  const fields = Object.getOwnPropertyNames(props.initialValues.information);
  
  const componentInformation = (context: BaseFieldsProps) => (
    <InformationForm 
      context={context}
    />
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
        
        <Grid item xs={12} md={4}>
          <SubmitForm {...props}/>
        </Grid>
      </Grid>
    </form>
  );

  return render;
};

export const RequestFormContainer = reduxForm<ExpenseFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(connect()(requestFormContainer));