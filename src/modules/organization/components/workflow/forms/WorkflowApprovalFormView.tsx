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
    approvalTitle, approvalSubHeader,
    approvalDialogFullScreen, isOpenDialog, approvalDialogTitle, 
    approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText, 
    handleDialogOpen, handleDialogClose, handleDialogConfirmed,
    approvalChoices, formIsApproved  
  } = props;

  const renderDialog = (
    <Dialog
      fullScreen={approvalDialogFullScreen}
      open={isOpenDialog}
      aria-labelledby="workflow-approval-dialog-title"
      aria-describedby="workflow-approval-dialog-description"
    >
      <DialogTitle id="workflow-approval-dialog-title">
        {approvalDialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="workflow-approval-dialog-description">
          {approvalDialogContentText || 'content'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {approvalDialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {approvalDialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const render = (
    <div>
      <form onSubmit={props.handleSubmit}>
        <Card square>
          <CardHeader 
            title={approvalTitle}
            subheader={approvalSubHeader}
          />
          <CardContent>
            <Field
              name="isApproved"
              required={true}
              label={<FormattedMessage id={'workflow.approval.field.isApproved'} />}
              component={RadioGroup}
              choices={approvalChoices}
            />
            { 
              formIsApproved !== undefined &&
              !formIsApproved &&
              <Field
                name="remark"
                required={true}
                label={<FormattedMessage id={'workflow.approval.field.remark'} />}
                placeholder={<FormattedMessage id={'workflow.approval.field.remark.placeholder'} />}
                component={InputTextArea}
              />
            }
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
              type="button"
              color="secondary"
              disabled={!props.valid || props.submitting}
              onClick={() => handleDialogOpen()}
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