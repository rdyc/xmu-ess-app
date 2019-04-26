import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IOrganizationWorkflowFormValue, WorkflowFormProps } from './OrganizationWorkFlowForm';
import WorkflowHierarchyPartialForm from './partial/WorkflowHierarchyPartialForm';

export const OrganizationWorkflowFormView: React.SFC<WorkflowFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupWorkflow,
      parentUid: AppMenu.Lookup,
      parentUrl: '/organization/workflow',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.workflowSetup.page.newTitle : organizationMessage.workflowSetup.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.workflowSetup.page.newSubHeader : organizationMessage.workflowSetup.page.modifySubHeader)
    }}
    state={props.organizationWorkflowState.certain}
    onLoadApi={props.handleOnLoadDetail}  
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IOrganizationWorkflowFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <WorkflowHierarchyPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  classes={{
                    marginFarRight: props.classes.marginFarRight,
                    marginWideTop: props.classes.marginWideTop
                  }}
                  filterOrganizationHierarchy={props.filterOrganizationHierarchy}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(lookupMessage.shared.submission.form, {state: 'Workflow'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createTitle : lookupMessage.shared.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.shared.confirm.createDescription : lookupMessage.shared.confirm.modifyDescription, {state: 'Workflow'}),
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