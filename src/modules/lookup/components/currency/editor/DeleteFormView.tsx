import { DialogConfirmation } from '@layout/components/dialogs';
import { CurrencyUserAction } from '@lookup/classes/types';
import * as React from 'react';
import { DeleteProps } from './DeleteForm';

export const DeleteFormView: React.SFC<DeleteProps> = props => (
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
          props.action === CurrencyUserAction.Modify
            ? props.handleDialogConfirmed
            : props.handleDeleteConfirmed
        }
      />
    </form>
  </div>
);