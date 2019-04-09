import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ILeaveRequestFormValue, LeaveRequestFormProps } from './LeaveRequestForm';
import LeaveDetailPartialForm from './partials/LeaveDetailPartialForm';

export const LeaveRequestFormView: React.SFC<LeaveRequestFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      parentUrl: '/leave/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? leaveMessage.request.page.newTitle : leaveMessage.request.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? leaveMessage.request.page.newSubHeader : leaveMessage.request.page.modifySubHeader)
    }}
    state={props.leaveRequestState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ILeaveRequestFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <LeaveDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  // isRequestor={props.isRequestor}
                  intl={props.intl}
                  handleFilterLeave={props.handleFilterLeave}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupLeave={props.filterLookupLeave}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>

              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(leaveMessage.request.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(leaveMessage.request.confirm.newTitle),
                    message: props.intl.formatMessage(leaveMessage.request.confirm.newDescription),
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