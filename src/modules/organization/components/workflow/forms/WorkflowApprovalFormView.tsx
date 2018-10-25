import { RadioGroup } from '@layout/components/input/radioGroup';
import { InputTextArea } from '@layout/components/input/textArea';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { WorkflowApprovalFormProps } from './WorkflowApprovalForm';

export const WorkflowApprovalFormView: React.SFC<WorkflowApprovalFormProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription,
    dialogCancelText, dialogConfirmedText, handleDialogClose, 
    handleDialogConfirmed  
  } = props;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="project-detail-dialog-title"
      aria-describedby="project-detail-dialog-description"
    >
      <DialogTitle id="project-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="project-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const render = (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Card square>
          <CardHeader 
            title={<FormattedMessage id="workflow.approvalTitle"/>}
            subheader={<FormattedMessage id="workflow.approvalSubTitle" />}
          />
          <CardContent>
            <Field
              name="isApproved"
              required={true}
              label={<FormattedMessage id={'workflow.approval.field.isApproved'} />}
              component={RadioGroup}
            />
            <Field
              name="remark"
              required={true}
              label={<FormattedMessage id={'workflow.approval.field.remark'} />}
              component={InputTextArea}
            />
          </CardContent>
          <CardActions>
            <Button 
              type="button"
              color="default"
              disabled={props.submitting}
              onClick={props.reset}
            >
              <FormattedMessage id={'global.action.reset'} />
            </Button>
            <Button 
              type="submit"
              color="secondary"
              disabled={!props.valid || props.submitting}
            >
              <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit'}/>
            </Button>
          </CardActions>
        </Card>
      </form>
      {renderDialog}
    </div>
  );

  return render;
};