// import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { 
  Button, 
  Dialog,
  DialogActions, 
  DialogContent, 
  DialogTitle,
  IconButton,
  Typography
  } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IRecurringTriggerFormValue, RecurringTriggerFormProps } from './RecurringTriggerForm';
import RecurringTriggerPartial from './RecurringTriggerPartial';

export const RecurringTriggerFormView: React.SFC<RecurringTriggerFormProps> = props => (
  <Dialog
    open={props.isOpen}
    onClose={() => props.handleTriggerVisibility(false)}
    maxWidth="lg"
  >
    <DialogTitle className={props.classes.dialogTitle} >
      <Typography variant="h6">
      {props.intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Trigger'})}
      </Typography>
      <IconButton aria-label="Close" className={props.classes.dialogClose} onClick={() => props.handleTriggerVisibility(false)}>
        <Close />
      </IconButton>
    </DialogTitle>

    <DialogContent className={props.classes.dialogContent}>
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IRecurringTriggerFormValue>) => (
          <Form>
            <RecurringTriggerPartial 
              intl={props.intl}
              formikBag={formikBag}
            />
            <SubmissionForm 
              title={props.intl.formatMessage(webJobMessage.shared.section.submissionTitle, {state: 'Recurring'})}
              className={props.classes.flexContent}
              formikProps={formikBag}
              buttonLabelProps={{
                reset: props.intl.formatMessage(layoutMessage.action.reset),
                submit: props.intl.formatMessage(layoutMessage.action.submit),
                processing: props.intl.formatMessage(layoutMessage.text.processing)
              }}
              confirmationDialogProps={{
                title: props.intl.formatMessage(webJobMessage.shared.confirm.uploadTitle, {state: 'Recurring'}),
                message: props.intl.formatMessage(webJobMessage.shared.confirm.uploadDescription, {state: 'Recurring'}),
                labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
              }} 
            />
            {/* <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <RecurringTriggerPartial 
                    intl={props.intl}
                    formikBag={formikBag}
                  />
                </div>
                <div className={props.classes.flexContent}>
                  <FormikJsonValues formikBag={formikBag} />
                </div>
              </div>
    
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <SubmissionForm 
                    title={props.intl.formatMessage(webJobMessage.shared.section.submissionTitle, {state: 'Recurring'})}
                    className={props.classes.flexContent}
                    formikProps={formikBag}
                    buttonLabelProps={{
                      reset: props.intl.formatMessage(layoutMessage.action.reset),
                      submit: props.intl.formatMessage(layoutMessage.action.submit),
                      processing: props.intl.formatMessage(layoutMessage.text.processing)
                    }}
                    confirmationDialogProps={{
                      title: props.intl.formatMessage(webJobMessage.shared.confirm.uploadTitle, {state: 'Recurring'}),
                      message: props.intl.formatMessage(webJobMessage.shared.confirm.uploadDescription, {state: 'Recurring'}),
                      labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                      labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                    }} 
                  />
                </div>
              </div>
            </div> */}
          </Form>
        )}
      />
    </DialogContent>

    <DialogActions className={props.classes.dialogActions}>
      <Button color="secondary">
        Reset
      </Button>
      <Button color="primary">
        Submit
      </Button>               
    </DialogActions>
  </Dialog>
);