import { DialogConfirmation } from '@layout/components/dialogs';
import { RoleUserAction } from '@lookup/classes/types';
import * as React from 'react';
import { RoleDeleteProps } from './LookupRoleDelete';

export const LookupRoleDeleteView: React.SFC<RoleDeleteProps> = props => (
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
          props.action === RoleUserAction.Modify
            ? props.handleDialogConfirmed
            : props.handleDeleteConfirmed
        }
      />
    </form>
  </div>
);