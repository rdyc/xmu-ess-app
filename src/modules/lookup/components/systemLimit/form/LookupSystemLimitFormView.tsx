import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ISystemLimitFormValue, SystemLimitFormProps } from './LookupSystemLimitForm';
import LookupSystemLimitDetailPartialForm from './partial/LookupSystemLimitDetailPartialForm';

export const SystemLimitFormView: React.SFC<SystemLimitFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupSystemLimit,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/systemlimits',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.systemLimit.page.newTitle : lookupMessage.systemLimit.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.systemLimit.page.newSubHeader : lookupMessage.systemLimit.page.modifySubHeader)
    }}
    state={props.systemLimitState.detail}
    onLoadApi={props.handleOnLoadApi}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ISystemLimitFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LookupSystemLimitDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  filterLookupCompany={props.filterLookupCompany}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(lookupMessage.shared.submission.form, {state: 'System Limit'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createTitle : lookupMessage.shared.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createDescription : lookupMessage.shared.confirm.modifyDescription, {state: 'System Limit'}),
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