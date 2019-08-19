import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { INotifPeriodFormValue, NotifPeriodFormProps } from './NotifPeriodForm';
import NotifPeriodDetailPartialForm from './partials/NotifPeriodDetailPartialForm';

export const NotifPeriodFormView: React.SFC<NotifPeriodFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.HRNotifPeriod,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/notification/periods',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.page.newTitle : notifMessage.period.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.page.newSubHeader : notifMessage.period.page.modifySubHeader)
    }}
    state={props.notifPeriodState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<INotifPeriodFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifPeriodDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  periodOptions={props.periodOptions}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(notifMessage.period.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.confirm.newTitle : notifMessage.period.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.period.confirm.newDescription : notifMessage.period.confirm.modifyDescription),
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