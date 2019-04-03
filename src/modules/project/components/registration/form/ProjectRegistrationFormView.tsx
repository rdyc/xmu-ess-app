import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import ProjectDetailPartialForm from './partials/ProjectDetailPartialForm';
import ProjectDocumentPartialForm from './partials/ProjectDocumentPartialForm';
import ProjectSalesPartialForm from './partials/ProjectSalesPartialForm';
import { IProjectRegistrationFormValue, ProjectRegistrationFormProps } from './ProjectRegistrationForm';

export const ProjectRegistrationFormView: React.SFC<ProjectRegistrationFormProps> = props => (
  <FormPage
    info={props.info}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IProjectRegistrationFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  isRequestor={props.isRequestor}
                  intl={props.intl}
                  allowedProjectTypes={props.allowedProjectTypes}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCustomer={props.filterLookupCustomer}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectDocumentPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  type="documentProjects"
                />
              </div>

              <div className={props.classes.flexContent}>
                <ProjectDocumentPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  type="documentPreSales"
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectSalesPartialForm
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  classes={{
                    marginFarRight: props.classes.marginFarRight,
                    marginWideTop: props.classes.marginWideTop
                  }}
                  filterAccountEmployee={props.filterAccountEmployee}
                />
              </div>

              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(projectMessage.registration.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(projectMessage.registration.confirm.newTitle),
                    message: props.intl.formatMessage(projectMessage.registration.confirm.newDescription),
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