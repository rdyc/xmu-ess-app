import { DialogConfirmation } from '@layout/components/dialogs';
import { RadioGroup } from '@layout/components/input/radioGroup';
import { InputTextArea } from '@layout/components/input/textArea';
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { WorkflowApprovalFormProps } from './WorkflowApprovalForm';

export const WorkflowApprovalFormView: React.SFC<WorkflowApprovalFormProps> = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Card square>
        <CardHeader 
          title={props.approvalTitle}
          subheader={props.approvalSubHeader}
        />
        <CardContent>
          <Field
            name="isApproved"
            required={true}
            label={<FormattedMessage id={'workflow.approval.field.isApproved'} />}
            placeholder={props.intl.formatMessage({id: 'workflow.approval.field.isApproved.placeholder'})}
            choices={props.approvalChoices}
            component={RadioGroup}
          />
          { 
            props.formIsApproved &&
            props.formIsApproved !== props.approvalTrueValue &&
            <Field
              name="remark"
              required={true}
              label={props.approvalRemarkLabel || <FormattedMessage id={'workflow.approval.field.remark'} />}
              placeholder={props.approvalRemarkPlaceholder || props.intl.formatMessage({id: 'workflow.approval.field.remark.placeholder'})}
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
            <FormattedMessage id={'global.action.reset'} />
          </Button>
          <Button 
            type="button"
            color="secondary"
            disabled={!props.valid || props.submitting}
            onClick={() => props.handleDialogOpen()}
          >
            <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit'}/>
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