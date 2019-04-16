import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import ProjectAssignmentDetailPartialForm from './partials/ProjectAssignmentDetailPartialForm';
import ProjectAssingmentMemberPartialForm from './partials/ProjectAssignmentMemberPartialForm';
import { IProjectAssignmentFormValue, ProjectAssignmentFormProps } from './ProjectAssignmentForm';

export const ProjectAssignmentFormView: React.SFC<ProjectAssignmentFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.ProjectAssignmentRequest,
      parentUid: AppMenu.ProjectAssignment,
      parentUrl: '/project/assignments',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.page.newTitle : projectMessage.assignment.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.page.newSubHeader : projectMessage.assignment.page.modifySubHeader)
    }}
    state={props.projectAssignmentState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit} 
      render={(formikBag: FormikProps<IProjectAssignmentFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectAssignmentDetailPartialForm
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  filterProject={props.filterProject}
                  onChangeProject={props.handleOnSelectProject}
                />
              </div>
            </div>

            {
              formikBag.values.projectUid !== '' &&
              <React.Fragment>
                <div className={props.classes.flexColumn}>
                  <div className={props.classes.flexContent}>
                    <ProjectAssingmentMemberPartialForm
                      formikBag={formikBag}
                      formMode={props.formMode}
                      intl={props.intl}
                      classes={{
                        flexContent: props.classes.flexContent,
                        marginFarRight: props.classes.marginFarRight
                      }}
                      filterAccountEmployee={props.filterAccountEmployee}
                    />
                  </div>
                </div>

                <div className={props.classes.flexColumn}>
                  <div className={props.classes.flexContent}>
                    <SubmissionForm 
                      title={props.intl.formatMessage(projectMessage.assignment.submission.form)}
                      className={props.classes.flexContent}
                      formikProps={formikBag}
                      buttonLabelProps={{
                        reset: props.intl.formatMessage(layoutMessage.action.reset),
                        submit: props.intl.formatMessage(layoutMessage.action.submit),
                        processing: props.intl.formatMessage(layoutMessage.text.processing)
                      }}
                      confirmationDialogProps={{
                        title: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.confirm.newTitle : projectMessage.assignment.confirm.modifyTitle),
                        message: props.intl.formatMessage(props.formMode === FormMode.New ? projectMessage.assignment.confirm.newMessage : projectMessage.assignment.confirm.modifyMessage),
                        labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                        labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                      }} 
                    />
                  </div>
                  
                  <div className={props.classes.flexContent}>
                    <FormikJsonValues formikBag={formikBag} />
                  </div>

                </div>
              </React.Fragment>
            }
          </div>
        </Form>
      )}
    />
  </FormPage>
);