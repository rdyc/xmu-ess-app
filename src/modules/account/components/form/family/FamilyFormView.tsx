import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { FamilyFormProps, IFamilyFormValue } from './FamilyForm';
import FamilyDetailPartialForm from './partial/FamilyDetailPartialForm';

export const FamilyFormView: React.SFC<FamilyFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: `/account/employee/${props.match.params.employeeUid}/family`,
      title: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.page.newTitle : accountMessage.shared.page.modifyTitle, { state: 'Family'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.page.newSubHeader : accountMessage.shared.page.modifySubHeader)
    }}
    state={props.accountEmployeeFamilyState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IFamilyFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <FamilyDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(accountMessage.shared.section.submission, {state: 'Family'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.confirm.createTitle : accountMessage.shared.confirm.modifyTitle, { state: 'Family'}),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.confirm.createDescription : accountMessage.shared.confirm.modifyDescription, {state: 'Family'}),
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