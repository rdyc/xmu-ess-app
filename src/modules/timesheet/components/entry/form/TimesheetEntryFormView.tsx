import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import TimesheetEntryDetailPartialForm from './partial/TimesheetEntryDetailPartialForm';
import { ITimesheetEntryFormValue, TimesheetEntryFormProps } from './TimesheetEntryForm';

export const TimesheetEntryFormView: React.SFC<TimesheetEntryFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.TimesheetRequest,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.page.newTitle : timesheetMessage.entry.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.page.newSubHeader : timesheetMessage.entry.page.modifySubHeader)
    }}
    state={props.timesheetEntryState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ITimesheetEntryFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <TimesheetEntryDetailPartialForm 
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  companyUid={props.userState.user && props.userState.user.company.uid || ''}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCustomer={props.filterLookupCustomer}
                  filterProject={props.filterProject}
                  handleSetProjectFilter={props.handleSetProjectFilter}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(timesheetMessage.entry.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.confirm.newTitle : timesheetMessage.entry.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.confirm.newDescription : timesheetMessage.entry.confirm.modifyDescription),
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