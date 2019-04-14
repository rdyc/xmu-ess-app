import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectStatusMessage } from '@project/locales/messages/projectStatusMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import ProjectStatusDetailPartialForm from './partials/ProjectStatusDetailPartialForm';
import { IProjectStatusFormValue, ProjectStatusFormProps } from './ProjectStatusForm';

const formatStatus = (statusType: string): string => {
  let result = '';

  switch (statusType) {
    case WorkflowStatusType.Approved:
      result = 'Approved';
      break;

    case WorkflowStatusType.Closed:
      result = 'Closed';
      break;

    case WorkflowStatusType.ReOpened:
      result = 'Re-opened';
      break;
  
    default:
      break;
  }

  return result;
};

export const ProjectStatusFormView: React.SFC<ProjectStatusFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      parentUrl: `/project/requests/${props.projectUid}`,
      title: props.intl.formatMessage(projectMessage.registration.page.statusModifyTitle),
      description: props.intl.formatMessage(projectMessage.registration.page.statusModifySubHeader)
    }}
    state={props.projectRegisterState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IProjectStatusFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ProjectStatusDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  allowedStatusTypes={props.statusTypes}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(projectMessage.registration.submission.formStatus)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(projectStatusMessage.statusTitle),
                    message: props.intl.formatMessage(projectStatusMessage.statusContent, { status: formatStatus(formikBag.values.statusType)}),
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