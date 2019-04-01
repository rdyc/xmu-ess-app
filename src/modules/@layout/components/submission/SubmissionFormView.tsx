import { DialogConfirmation } from '@layout/components/dialogs';
import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import * as React from 'react';

import { SubmissionFormProps } from './SubmissionForm';

export const SubmissionFormView: React.SFC<SubmissionFormProps> = props => (
  <React.Fragment>
    <Card square className={props.className}>
      <CardHeader 
        title={props.title}
        subheader={props.subheader}
      />
      <CardActions>
        <Button
          fullWidth
          type="reset"
          color="secondary"
          disabled={!props.formikProps.dirty || props.formikProps.isSubmitting}
        >
          {props.buttonLabelProps.reset}
        </Button>

        <Button
          fullWidth
          type="button"
          color="primary"
          disabled={props.formikProps.isSubmitting}
          onClick={() => props.setOpen()}
        >
          {props.formikProps.isSubmitting ? props.buttonLabelProps.processing : props.buttonLabelProps.submit}
        </Button>
      </CardActions>
    </Card>

    <DialogConfirmation
      title={props.confirmationDialogProps.title}
      content={props.confirmationDialogProps.message}
      labelCancel={props.confirmationDialogProps.labelCancel}
      labelConfirm={props.confirmationDialogProps.labelConfirm}
      isOpen={props.isOpenDialog}
      fullScreen={props.confirmationDialogProps.fullScreen}
      onClickCancel={props.handleOnCanceled}
      onClickConfirm={props.handleOnConfirmed}
    />
  </React.Fragment>
);