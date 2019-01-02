import { RadioGroup } from '@layout/components/input/radioGroup';
import { InputTextArea } from '@layout/components/input/textArea';
import { layoutMessage } from '@layout/locales/messages';
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
  DialogTitle
} from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field } from 'redux-form';
import { WorkflowApprovalMileageFormProps } from './WorkflowMileageApproval';

export const WorkflowMileageApprovalView: React.SFC<
  WorkflowApprovalMileageFormProps
> = props => {
  const {
    itemTrue,
    approvalTitle,
    // approvalSubHeader,
    approvalDialogFullScreen,
    isOpenDialog,
    approvalDialogTitle,
    approvalDialogContentText,
    approvalDialogCancelText,
    approvalDialogConfirmedText,
    handleDialogOpen,
    handleDialogClose,
    handleDialogConfirmed,
    approvalChoices,
    formIsApproved,
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
            // subheader={approvalSubHeader} 
          />
          <CardContent>
            <Field
              name="isApproved"
              required={true}
              label={props.intl.formatMessage(organizationMessage.workflow.field.isApproved)}
              placeholder={props.intl.formatMessage(organizationMessage.workflow.field.isApprovedPlaceholder)}
              choices={approvalChoices}
              component={RadioGroup}
            />
            {formIsApproved !== undefined &&
              !formIsApproved && (
                <Field
                  name="remark"
                  required={true}
                  label={props.approvalRemarkLabel || props.intl.formatMessage(organizationMessage.workflow.field.remark)}
                  placeholder={props.approvalRemarkPlaceholder || props.intl.formatMessage(organizationMessage.workflow.field.remarkPlaceholder)}
                  component={InputTextArea}
                />
              )}
          </CardContent>
          <CardActions>
            <Button
              type="button"
              color="secondary"
              disabled={props.submitting}
              onClick={props.reset}
            >
              {props.intl.formatMessage(layoutMessage.action.reset)}
            </Button>
            <Button
              type="button"
              color="secondary"
              disabled={(!props.valid || props.submitting) || itemTrue}
              onClick={() => handleDialogOpen()}
            >
              {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
            </Button>
          </CardActions>
        </Card>
      </form>
      {renderDialog}
    </div>
  );

  return render;
};
