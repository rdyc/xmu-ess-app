import { DialogConfirmation } from '@layout/components/dialogs';
import { CompanyUserAction } from '@lookup/classes/types';
import * as React from 'react';
import { CompanyDeleteProps } from './LookupCompanyDelete';

export const LookupCompanyDeleteView: React.SFC<CompanyDeleteProps> = props => (
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
          props.action === CompanyUserAction.Modify
            ? props.handleDialogConfirmed
            : props.handleDeleteConfirmed
        }
      />
    </form>
  </div>
);