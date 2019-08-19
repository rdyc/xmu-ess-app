import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IRoleFormValue, RoleFormProps } from './LookupRoleForm';
import LookupRoleDetailPartialForm from './partial/LookupRoleDetailPartialForm';
import { LookupRoleMenuPartialForm } from './partial/LookupRoleMenuPartialForm';

export const LookupRoleFormView: React.SFC<RoleFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupRole,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/roles',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.role.page.newTitle : lookupMessage.role.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.role.page.newSubHeader : lookupMessage.role.page.modifySubHeader)
    }}
    state={props.lookupRoleState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IRoleFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LookupRoleDetailPartialForm 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterLookupCompany={props.filterLookupCompany}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LookupRoleMenuPartialForm 
                  intl={props.intl}
                  formikBag={formikBag}
                  formMode={props.formMode}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(lookupMessage.shared.submission.form, {state: 'Role'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createTitle : lookupMessage.shared.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createDescription : lookupMessage.shared.confirm.modifyDescription, {state: 'Role'}),
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