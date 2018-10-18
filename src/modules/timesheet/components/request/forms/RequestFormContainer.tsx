import { Grid } from '@material-ui/core';
import { InformationForm } from '@timesheet/components/request/forms/InformationForm';
import { SubmitForm } from '@timesheet/components/request/forms/SubmitForm';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  BaseFieldsProps,
  Fields,
  FormSection,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

export type TimesheetFormData = {
  information: {
    activityType: string | undefined;
    customerUid: string | undefined;
    projectUid: string | undefined;
    siteUid: string | undefined;
    date: string | undefined;
    start: string | undefined;
    end: string | undefined;
    notes: string | undefined;
  }
};

const formName = 'timesheet';

type AllProps = InjectedFormProps<TimesheetFormData>;

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

export const RequestFormContainer = reduxForm<TimesheetFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(connect()(requestFormContainer));