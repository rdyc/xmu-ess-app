import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

import { StatusDetailForm } from './StatusDetailForm';
import { StatusFormProps } from './StatusForm';

export const StatusFormView: React.SFC<StatusFormProps> = props => {
  const { formMode, statusType, projectData, initialValues } = props;
  const fields = Object.getOwnPropertyNames(initialValues.information);
  
  const componentInformation = (context: BaseFieldsProps) => (
    <StatusDetailForm 
      formMode={formMode}
      context={context}
      statusType={statusType}
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
        <Grid item sm={12} md={4}>
          <ProjectInformation data={projectData} />
        </Grid>
        
        <Grid item sm={12} md={4}>
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