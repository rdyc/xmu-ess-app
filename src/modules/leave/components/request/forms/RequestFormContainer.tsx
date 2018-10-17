import { InformationForm } from '@leave/components/request/forms/InformationForm';
import { SubmitForm } from '@leave/components/request/forms/SubmitForm';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import {
  BaseFieldsProps,
  Fields,
  FormSection,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

export type LeaveRequestFormData = {
  information: {
    leaveType: string | undefined;
    regularType: string | undefined;
    start: string | undefined;
    end: string | undefined;
    address: string | undefined;
    contactNumber: string | undefined;
    reason: string | undefined;
  }
};

const formName = 'leaveRequest';

type AllProps = InjectedFormProps<LeaveRequestFormData>;

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

export const RequestFormContainer = reduxForm<LeaveRequestFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(requestFormContainer);