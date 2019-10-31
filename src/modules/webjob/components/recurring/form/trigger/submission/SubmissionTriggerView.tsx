import { DialogConfirmation } from '@layout/components/dialogs';
import * as React from 'react';

import { SubmissionTriggerProps } from './SubmissionTrigger';

export const SubmissionTriggerView: React.ComponentType<SubmissionTriggerProps> = props => (
  <React.Fragment>
    {
      !props.formikProps.isSubmitting &&
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
    }
  </React.Fragment>
);