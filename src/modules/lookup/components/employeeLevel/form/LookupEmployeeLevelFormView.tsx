import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { EmployeeLevelFormProps, IEmployeeLevelFormValue } from './LookupEmployeeLevelForm';
import LookupEmployeeLevelPartial from './LookupEmployeeLevelPartial';

export const LookupEmployeeLevelFormView: React.SFC<EmployeeLevelFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupEmployeeLevel,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/employeelevels',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.employeeLevel.page.newTitle : lookupMessage.employeeLevel.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.employeeLevel.page.newSubHeader : lookupMessage.employeeLevel.page.modifySubHeader)
    }}
    state={props.employeeLevelState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IEmployeeLevelFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LookupEmployeeLevelPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(lookupMessage.shared.submission.form, {state: 'Employee Level'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createTitle : lookupMessage.shared.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createDescription : lookupMessage.shared.confirm.modifyDescription, {state: 'Employee Level'}),
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