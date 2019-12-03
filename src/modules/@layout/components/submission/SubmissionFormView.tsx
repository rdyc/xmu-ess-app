import { DialogConfirmation } from '@layout/components/dialogs';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';

import { SubmissionFormProps } from './SubmissionForm';

export const SubmissionFormView: React.ComponentType<SubmissionFormProps> = props => (
  <React.Fragment>
    <Card square>
      <CardHeader title={props.title} subheader={props.subheader} />
      
      {
        !props.formikProps.isSubmitting &&
        props.formikProps.status &&
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label="Date"
            value={props.formikProps.status.date || 'N/A'}
          />

          {
            !props.formikProps.status.Code ?
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label="Correlation ID"
              value={props.formikProps.status.id || 'N/A'}
            /> :
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label="Code"
              value={props.formikProps.status.Code || 'N/A'}
            /> 
          }

          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline
            label="Status"
            value={props.intl.formatMessage({id: !props.formikProps.status.Code ? props.formikProps.status.message : props.formikProps.status.Message})}
          />
        </CardContent>
      }
      
      <CardActions>
        <Button
          fullWidth
          type="reset"
          color="secondary"
          disabled={!props.formikProps.dirty || props.formikProps.isSubmitting || props.disableButtons}
        >
          {props.buttonLabelProps.reset}
        </Button>

        <Button
          fullWidth
          type="button"
          color="primary"
          disabled={props.formikProps.isSubmitting || props.disableButtons}
          onClick={() => props.confirmationDialogProps ? 
            props.setOpen() : 
            props.handleSubmitAction ?
              props.handleSubmitAction() : 
              props.formikProps.submitForm()}
        >
          {props.formikProps.isSubmitting ? props.buttonLabelProps.processing : props.buttonLabelProps.submit}
        </Button>
      </CardActions>
    </Card>

    {
      props.confirmationDialogProps &&
      !props.formikProps.isSubmitting &&
      <DialogConfirmation
        title={props.confirmationDialogProps.title}
        content={props.confirmationDialogProps.message}
        labelCancel={props.confirmationDialogProps.labelCancel}
        labelConfirm={props.confirmationDialogProps.labelConfirm}
        isOpen={props.isOpenDialog}
        fullScreen={props.confirmationDialogProps.fullScreen}
        onClickCancel={props.handleOnCanceled}
        onClickConfirm={props.handleOnConfirmed}
      />
    }
  </React.Fragment>
);