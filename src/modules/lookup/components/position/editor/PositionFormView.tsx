import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { PositionDetailForm } from './PositionDetailForm';
import { PositionFormProps } from './PositionForm';

export const PositionFormView: React.SFC<PositionFormProps> = props => {
  
  const { formMode, initialValues } = props;

  const field = Object.getOwnPropertyNames(initialValues);
  const fieldinfo = Object.getOwnPropertyNames(initialValues.information);
  const fields = fieldinfo.concat(field);

  const componentInformation = (context: BaseFieldsProps) => (
    <PositionDetailForm
      formMode={formMode}
      context={context}
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

        <Grid item md={4}>
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