import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IWebJobRecurringFormValue, WebJobRecurringFormProps } from './WebJobRecurringForm';
import WebJobRecurringPartial from './WebJobRecurringPartial';

export const WebJobRecurringFormView: React.SFC<WebJobRecurringFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.WebJobRecurring,
      parentUid: AppMenu.WebJob,
      parentUrl: '/webjob/recurrings',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? webJobMessage.shared.page.createTitle :  webJobMessage.shared.page.modifyTitle, {state: 'Recurring'}),
    }}
    state={props.webJobRecurringState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IWebJobRecurringFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <WebJobRecurringPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                />
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
  
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <FormikJsonValues formikBag={formikBag} />
              </div>
            </div>
          </div>
        </Form>
      )}
    />
  </FormPage>
);