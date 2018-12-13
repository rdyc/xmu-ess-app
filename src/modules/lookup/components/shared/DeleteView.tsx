import { DialogConfirmation } from '@layout/components/dialogs';
import { SystemLimitUserAction } from '@lookup/classes/types';
import * as React from 'react';
import { DeleteProps } from './Delete';

export const DeleteView: React.SFC<DeleteProps> = props => (
  <div>
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
          props.action === SystemLimitUserAction.Modify
            ? props.handleDialogConfirmed
            : props.handleDeleteConfirmed
        }
      />
    </form>
  </div>
);
