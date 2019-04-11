import AppMenu from '@constants/AppMenu';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import ProjectHourDetailPartialForm from './partials/ProjectHourDetailPartialForm';
import { IProjectHourFormValue, ProjectHourFormProps } from './ProjectHourForm';

export const ProjectHourFormView: React.SFC<ProjectHourFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: `/project/requests/${props.projectUid}`,
      title: props.intl.formatMessage(projectMessage.registration.page.hourModifyTitle),
      description: props.intl.formatMessage(projectMessage.registration.page.hourModifySubHeader)
    }}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IProjectHourFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectHourDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(projectMessage.registration.submission.formHour)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourTitle),
                    message: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourDescription),
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