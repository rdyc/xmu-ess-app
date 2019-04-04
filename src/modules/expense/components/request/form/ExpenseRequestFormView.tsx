import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { ExpenseRequestFormProps, IExpenseRequestFormValue } from './ExpenseRequestForm';
import ExpenseDetailPartialForm from './partials/ExpenseDetailPartialForm';

export const ExpenseRequestFormView: React.SFC<ExpenseRequestFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      parentUrl: '/expense/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.page.createTitle : expenseMessage.request.page.editTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.page.createSubTitle : expenseMessage.request.page.editSubTitle)
    }}
    state={props.expenseRequestState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IExpenseRequestFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <ExpenseDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  isRequestor={props.isRequestor}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCustomer={props.filterLookupCustomer}
                  filterProject={props.filterProject}
                  setProjectFilter={props.handleSetProjectFilter}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>

              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(expenseMessage.request.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.dialog.createTitle : expenseMessage.request.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? expenseMessage.request.dialog.createDescription : expenseMessage.request.dialog.modifyDescription),
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