import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { MileageRequestDetailForm } from '@mileage/components/request/editor/forms/MileageRequestDetailForm';
import { MileageRequestFormProps } from '@mileage/components/request/editor/forms/MileageRequestForm';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

export const MileageRequestFormView: React.SFC<
  MileageRequestFormProps
> = props => {
  const { formMode } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <div>
      <MileageRequestDetailForm
        formMode={formMode}
        context={context}
      />
    </div>
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
        <Grid item xs={12} md={4}>
          <FormSection name="information">
            <Fields names={fields} component={componentInformation} />
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
