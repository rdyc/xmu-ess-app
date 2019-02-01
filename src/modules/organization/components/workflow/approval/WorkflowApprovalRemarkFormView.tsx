import { DialogConfirmation } from '@layout/components/dialogs';
import { RadioGroup } from '@layout/components/input/radioGroup';
import { InputTextArea } from '@layout/components/input/textArea';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field } from 'redux-form';

import { WorkflowApprovalRemarkFormProps } from './WorkflowApprovalRemarkForm';

export const WorkflowApprovalRemarkFormView: React.SFC<WorkflowApprovalRemarkFormProps> = props => {
  return (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Card square>
        <CardHeader 
          title={props.approvalTitle}
          // subheader={props.approvalSubHeader}
        />
        <CardContent>
          <Field
            name="isApproved"
            required={true}
            label={props.intl.formatMessage(organizationMessage.workflow.field.isApproved)}
            placeholder={props.intl.formatMessage(organizationMessage.workflow.field.isApprovedPlaceholder)}
            choices={props.approvalChoices}
            component={RadioGroup}
          />
          { 
            props.formIsApproved &&
            <Field
              name="remark"
              required={!props.remarkToogle}
              label={props.remarkToogle 
                ? (props.approvalOptionalRemarkLabel || props.intl.formatMessage(organizationMessage.workflow.field.remark)) 
                : (props.approvalRemarkLabel || props.intl.formatMessage(organizationMessage.workflow.field.remark))}
              placeholder={props.remarkToogle 
                ? (props.approvalOptionalRemarkPlaceholder || props.intl.formatMessage(organizationMessage.workflow.field.remarkPlaceholder)) 
                : props.approvalRemarkPlaceholder || props.intl.formatMessage(organizationMessage.workflow.field.remarkPlaceholder)}
              component={InputTextArea}
            />
          }
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
            disabled={!props.valid || props.submitting}
            onClick={() => props.handleDialogOpen()}
          >
            {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
          </Button>
        </CardActions>
      </Card>
    </form>
    
    <DialogConfirmation
      title={props.approvalDialogTitle}
      content={props.approvalDialogContentText}
      labelCancel={props.approvalDialogCancelText}
      labelConfirm={props.approvalDialogConfirmedText}
      isOpen={props.isOpenDialog}
      fullScreen={props.approvalDialogFullScreen}
      onClickCancel={props.handleDialogClose}
      onClickConfirm={props.handleDialogConfirmed}
    />
  </div>
);
};