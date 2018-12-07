import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { MileageExceptionContainerFormProps } from './MileageExceptionContainerForm';
import { MileageExceptionDetailForm } from './MileageExceptionDetailForm';

export const MileageExceptionContainerFormView: React.SFC<MileageExceptionContainerFormProps> = props => {
  const { 
    formMode, companyUidValue, projectUidValue, initialValues
  } = props;
  
  const fields = Object.getOwnPropertyNames(initialValues.information);
  
  const componentInformation = (context: BaseFieldsProps) => (
    <MileageExceptionDetailForm 
      formMode = {formMode}
      context={context}
      companyUidValue={companyUidValue}
      projectUidValue={projectUidValue}
    />
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