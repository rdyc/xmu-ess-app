import { DialogConfirmation } from '@layout/components/dialogs';
import { LookupUserAction } from '@lookup/classes/types';
import * as React from 'react';
import { DeleteProps } from './Delete';

export const DeleteView: React.SFC<DeleteProps> = props => (
  <div>
    {
      !props.submitting &&
      <form onSubmit={props.handleSubmit}>
        <DialogConfirmation
          title={props.title}
          content={props.content}
          labelCancel={props.labelCancel}
          labelConfirm={props.labelConfirm}
          isOpen={props.isOpenDialog}
          fullScreen={props.fullScreen}
          onClickCancel={props.handleDialogClose}
          onClickConfirm={
            props.action === LookupUserAction.Modify
              ? props.handleDialogConfirmed
              : props.handleDeleteConfirmed
          }
        />
      </form>
    }
  </div>
);
