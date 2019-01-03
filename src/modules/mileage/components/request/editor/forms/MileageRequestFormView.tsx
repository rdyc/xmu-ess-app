import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import { MileageRequestDetailForm } from '@mileage/components/request/editor/forms/MileageRequestDetailForm';
import { MileageRequestFormProps } from '@mileage/components/request/editor/forms/MileageRequestForm';
import { MileageRequestItemForm } from '@mileage/components/request/editor/forms/MileageRequestItemForm';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

export const MileageRequestFormView: React.SFC<
  MileageRequestFormProps
> = props => {
  const { formMode, formMonth, formYear } = props;
  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <div>
      <MileageRequestDetailForm formMode={formMode} context={context} />
    </div>
  );

  const componentItem = () => (
    <MileageRequestItemForm year={Number(formYear)} month={Number(formMonth)} />
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
        <Grid item xs={12} md={8}>
          <Fields names={fields} component={componentItem} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Submission
            valid={props.valid}
            reset={props.reset}
            submitting={props.submitting}
            withSubmitDialog={true}
            formName={props.formName}
            submitDialogTitle={props.submitDialogTitle}
            submitDialogContentText={props.submitDialogContentText}
            submitDialogCancelText={props.submitDialogCancelText}
            submitDialogConfirmedText={props.submitDialogConfirmedText}
          />
        </Grid>
      </Grid>
    </form>
  );

  return render;
};
