import { DialogConfirmation } from '@layout/components/dialogs';
import { InputTextArea } from '@layout/components/input/textArea';
import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { LeaveCancellationFormProps } from './LeaveCancellationForm';

export const LeaveCancellationFormView: React.SFC<LeaveCancellationFormProps> = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Card square>
        <CardHeader 
          title={props.approvalTitle}
          subheader={props.approvalSubHeader}
        />
        <CardContent>
            <Field
              name="cancelDate"
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
      title={props.cancellationDialogTitle}
      content={props.cancellationDialogContentText}
      labelCancel={props.cancellationDialogCancelText}
      labelConfirm={props.cancellationDialogConfirmedText}
      isOpen={props.isOpenDialog}
      fullScreen={props.cancellationDialogFullScreen}
      onClickCancel={props.handleDialogClose}
      onClickConfirm={props.handleDialogConfirmed}
    />
  </div>
);