// import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { 
  Dialog,
  DialogContent, 
  DialogTitle,
  IconButton,
  TextField,
  Typography
  } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IRecurringTriggerFormValue, RecurringTriggerFormProps } from './RecurringTriggerForm';
import RecurringTriggerPartial from './RecurringTriggerPartial';
// import { SubmissionTrigger } from './submission/SubmissionTrigger';

export const RecurringTriggerFormView: React.SFC<RecurringTriggerFormProps> = props => (
  <Dialog
    open={props.isOpen}
    onClose={() => props.handleTriggerVisibility(false)}
    maxWidth="xs"
    fullWidth
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IRecurringTriggerFormValue>) => (
        <Form>
          <DialogTitle className={props.classes.dialogTitle} >
            <Typography variant="h6">
            {props.intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Trigger'})}
            </Typography>
            <IconButton aria-label="Close" className={props.classes.dialogClose} onClick={() => props.handleTriggerVisibility(false)}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent className={props.classes.dialogContent}>

            {/* Partial */}
            <RecurringTriggerPartial 
              intl={props.intl}
              formikBag={formikBag}
            />

            {/* Handling Error */}
            {
              !formikBag.isSubmitting &&
              formikBag.status &&
              <React.Fragment>
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  label="Date"
                  value={formikBag.status.date || 'N/A'}
                />

                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  label="Correlation ID"
                  value={formikBag.status.id || 'N/A'}
                />

                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  multiline
                  label="Status"
                  value={props.intl.formatMessage({id: formikBag.status.message})}
                />
              </React.Fragment>
            }

          </DialogContent>

          {/* Submission for trigger */}
          {/* <SubmissionTrigger
            className={props.classes.dialogActions}
            buttonLabelProps={{
              reset: props.intl.formatMessage(layoutMessage.action.reset),
              submit: props.intl.formatMessage(layoutMessage.action.submit),
              processing: props.intl.formatMessage(layoutMessage.text.processing)
            }}
            formikProps={formikBag}
            confirmationDialogProps={{
              title: props.intl.formatMessage(webJobMessage.shared.confirm.uploadTitle, {state: 'Recurring'}),
              message: props.intl.formatMessage(webJobMessage.shared.confirm.uploadDescription, {state: 'Recurring'}),
              labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
              labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
            }} 
          />              */}
        </Form>
      )}
    />
  </Dialog>
);