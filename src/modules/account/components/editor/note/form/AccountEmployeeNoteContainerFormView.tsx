import { Submission } from '@layout/components/submission/Submission';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeNoteContainerFormProps } from './AccountEmployeeNoteContainerForm';
import { AccountEmployeeNoteDetailForm } from './AccountEmployeeNoteDetailForm';

export const AccountEmployeeNoteContainerView: React.SFC<AccountEmployeeNoteContainerFormProps> = props => {
  const { initialValues, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.note);

  const componentNote = (context: BaseFieldsProps) => (
    <AccountEmployeeNoteDetailForm formMode={formMode} context={context}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4} >
          <FormSection name="note">
            <Fields names={fields} component={componentNote} />
          </FormSection>
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