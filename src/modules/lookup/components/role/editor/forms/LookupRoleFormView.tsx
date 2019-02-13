import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { ExperimentMenu } from './ExperimentMenu';
import { LookupRoleDetailForm } from './LookupRoleDetailForm';
import { RoleFormProps } from './LookupRoleForm';

export const LookupRoleFormView: React.SFC<RoleFormProps> = props => {
  const { formMode } = props;

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <LookupRoleDetailForm
      formMode={formMode}
      context={context}
    />
  );

  // const componentRoleMenu = (context: WrappedFieldArrayProps<any>) => (
  //   <LookupRoleMenuForm context={context} />
  // );

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
            <Fields
              names={fields}
              component={componentInformation}
            />
          </FormSection>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* <FormSection name="menu">
            <FieldArray
              name="menus"
              component={componentRoleMenu}
            />
          </FormSection> */}
          <ExperimentMenu />
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