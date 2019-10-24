import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IWebJobDefinitoinFormValue, WebJobDefinitionFormProps } from './WebJobDefinitionForm';
import WebJobDefinitionPartial from './WebJobDefinitionPartial';

export const WebJobDefinitionFormView: React.SFC<WebJobDefinitionFormProps> = props => (
  <Formik
    enableReinitialize
    initialValues={props.initialValues}
    validationSchema={props.validationSchema}
    onSubmit={props.handleOnSubmit}
    render={(formikBag: FormikProps<IWebJobDefinitoinFormValue>) => (
      <Form>
        <div className={props.classes.flexRow}>
          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <WebJobDefinitionPartial 
                intl={props.intl}
                formikBag={formikBag}
              />
            </div>
          </div>

          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <SubmissionForm 
                title={props.intl.formatMessage(webJobMessage.shared.section.submissionTitle, {state: 'Definition'})}
                className={props.classes.flexContent}
                formikProps={formikBag}
                buttonLabelProps={{
                  reset: props.intl.formatMessage(layoutMessage.action.reset),
                  submit: props.intl.formatMessage(layoutMessage.action.submit),
                  processing: props.intl.formatMessage(layoutMessage.text.processing)
                }}
                confirmationDialogProps={{
                  title: props.intl.formatMessage(webJobMessage.shared.confirm.uploadTitle, {state: 'Definition'}),
                  message: props.intl.formatMessage(webJobMessage.shared.confirm.uploadDescription, {state: 'Definition'}),
                  labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                  labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                }} 
              />
            </div>
          </div>

          <div className={props.classes.flexColumn}>
            <div className={props.classes.flexContent}>
              <FormikJsonValues formikBag={formikBag} />
            </div>
          </div>
        </div>
      </Form>
    )}
  />
);