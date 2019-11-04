import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { INotifTemplateFormValue, NotifTemplateFormProps } from './NotifTemplateForm';
import NotifTemplateContentPartialForm from './partials/NotifTemplateContentPartialForm';
import NotifTemplateDetailPartialForm from './partials/NotifTemplateDetailPartialForm';

export const NotifTemplateFormView: React.SFC<NotifTemplateFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.HRNotifTemplate,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/notification/templates',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.page.newTitle : notifMessage.template.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.page.newSubHeader : notifMessage.template.page.modifySubHeader)
    }}
    state={props.notifTemplateState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<INotifTemplateFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifTemplateDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifTemplateContentPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(notifMessage.template.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.confirm.newTitle : notifMessage.template.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.template.confirm.newDescription : notifMessage.template.confirm.modifyDescription),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </div>
              
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