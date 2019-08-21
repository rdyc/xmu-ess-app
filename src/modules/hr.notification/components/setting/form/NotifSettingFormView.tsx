import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { INotifSettingFormValue, NotifSettingFormProps } from './NotifSettingForm';
import NotifSettingDetailPartialForm from './partials/NotifSettingDetailPartialForm';
import NotifSettingMailPartialForm from './partials/NotifSettingMailPartialForm';

export const NotifSettingFormView: React.SFC<NotifSettingFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.HRNotifSetting,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/notification/settings',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.page.newTitle : notifMessage.setting.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.page.newSubHeader : notifMessage.setting.page.modifySubHeader)
    }}
    state={props.notifSettingState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<INotifSettingFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifSettingDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifSettingMailPartialForm 
                  title={props.intl.formatMessage(notifMessage.setting.section.mailToTitle)}
                  formMode={props.formMode}
                  fieldName="to"
                  fieldLabel={props.intl.formatMessage(notifMessage.setting.field.to)}
                  fieldPlaceholder={props.intl.formatMessage(notifMessage.setting.field.toPlaceholder)}
                  values={formikBag.values.to}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <NotifSettingMailPartialForm 
                  title={props.intl.formatMessage(notifMessage.setting.section.mailCcTitle)}
                  formMode={props.formMode}
                  fieldName="cc"
                  fieldLabel={props.intl.formatMessage(notifMessage.setting.field.cc)}
                  fieldPlaceholder={props.intl.formatMessage(notifMessage.setting.field.ccPlaceholder)}
                  values={formikBag.values.cc}
                />
              </div>

              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(notifMessage.setting.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.confirm.newTitle : notifMessage.setting.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? notifMessage.setting.confirm.newDescription : notifMessage.setting.confirm.modifyDescription),
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