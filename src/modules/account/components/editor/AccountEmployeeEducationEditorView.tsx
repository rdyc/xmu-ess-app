import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { FormInstance } from 'redux-form';
import { AccountEmployeeEducationEditorProps } from './AccountEmployeeEducationEditor';
import { AccountEmployeeEducationContainerForm } from './form/education/AccountEmployeeEducationContainer';

export const AccountEmployeeEducationEditorView: React.SFC<AccountEmployeeEducationEditorProps> = props => {
  const { handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, 
    width, isOpenDialog, initialValues, 
    editAction, handleDialogClose, formMode } = props;
  
  const ref = React.createRef<FormInstance<any, any, any>>();
  const isMobile = isWidthDown('sm', width);

  const dialogTitle = () => {
    switch (editAction) {
      case 'update': return accountMessage.education.page.modifyTitle;
      case 'delete': return accountMessage.education.page.deleteTitle;

      default: return accountMessage.education.page.newTitle;
    }
  };

  const renderDialog = (
    <Dialog
      open={isOpenDialog}
      fullScreen={isMobile}
      scroll="paper"
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {props.intl.formatMessage(dialogTitle())}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <AccountEmployeeEducationContainerForm
          formMode={formMode}
          ref={ref}
          formAction={editAction ? editAction : 'update'}
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit} 
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitFail={handleSubmitFail}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialogClose()} color="secondary">
          {props.intl.formatMessage(layoutMessage.action.discard)}
        </Button>

        {
          editAction !== 'delete' &&
          <Button type="button" color="secondary" onClick={() => ref.current && ref.current.reset()} >
            {props.intl.formatMessage(layoutMessage.action.reset)}
          </Button>
        }

        <Button type="submit" color="secondary" onClick={() => ref.current && ref.current.submit()}>
          {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return renderDialog;
};