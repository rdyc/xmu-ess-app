import { Submission } from '@layout/components/submission/Submission';
import { LeaveRequestDetailForm } from '@leave/components/request/editor/forms/LeaveRequestDetailForm';
import { RequestFormProps } from '@leave/components/request/editor/forms/LeaveRequestForm';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

export const LeaveRequestFormView: React.SFC<RequestFormProps> = props => {
  
  const { 
    formMode, formIsRegularType, formRegularType, formValue, initialValues,
    change
  } = props;

  const fields = Object.getOwnPropertyNames(initialValues.information);

  const onChangeRegular = (event: any, newValue: string, oldValue: string) => {
    if (newValue === 'LVC02') {
      change('information.end', formValue);
    }
  };

  const onChangeEnd = (event: any, newValue: string, oldValue: string) => {
    if (formIsRegularType) {
    change('information.end', newValue);
    }
  };

  const componentInformation = (context: BaseFieldsProps) => (
    <LeaveRequestDetailForm 
      formMode={formMode}
      context={context}
      isRegularType={formIsRegularType}
      formRegularType={formRegularType}
      onChangeRegular={onChangeRegular}
      onChangeEnd={onChangeEnd}
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
