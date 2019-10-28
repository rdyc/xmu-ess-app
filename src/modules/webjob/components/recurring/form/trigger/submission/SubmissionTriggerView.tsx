import { DialogConfirmation } from '@layout/components/dialogs';
import { Button, DialogActions } from '@material-ui/core';
import * as React from 'react';

import { SubmissionTriggerProps } from './SubmissionTrigger';

export const SubmissionTriggerView: React.ComponentType<SubmissionTriggerProps> = props => (
  <React.Fragment>
    <DialogActions className={props.className}>
      <Button
        fullWidth
        type="reset"
        color="secondary"
        disabled={!props.formikProps.dirty || props.formikProps.isSubmitting || props.disableButtons}
      >
        {props.buttonLabelProps.reset}
      </Button>

      <Button
        fullWidth
        type="button"
        color="primary"
        disabled={props.formikProps.isSubmitting || props.disableButtons}
        onClick={() => props.setOpen()}
      >
        {props.formikProps.isSubmitting ? props.buttonLabelProps.processing : props.buttonLabelProps.submit}
      </Button>
    </DialogActions>

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