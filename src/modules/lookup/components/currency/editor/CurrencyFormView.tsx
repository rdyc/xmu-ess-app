import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { CurrencyDetailForm } from './CurrencyDetailForm';
import { CurrencyFormProps } from './CurrencyForm';

export const CurrencyFormView: React.SFC<CurrencyFormProps> = props => {
  
  const { formMode, initialValues } = props;
  const fields = Object.getOwnPropertyNames(initialValues);

  const componentInformation = (context: BaseFieldsProps) => (
    <CurrencyDetailForm
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
            valid={true}
            reset={props.reset}
            submitting={props.submitting}
          />
        </Grid>

      </Grid>
    </form>
  );

  return render;

};