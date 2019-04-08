import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import PurchaseDetailPartialForm from './partials/PurchaseDetailPartialForm';
import PurchaseItemPartialForm from './partials/PurchaseItemPartialForm';
import { IPurchaseRequestFormValue, PurchaseRequestFormProps } from './PurchaseRequestForm';

export const PurchaseRequestFormView: React.SFC<PurchaseRequestFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      parentUrl: '/purchase/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.pages.newTitle : purchaseMessage.request.pages.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.pages.newSubTitle : purchaseMessage.request.pages.modifySubTitle)
    }}
    state={props.purchaseRequestState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IPurchaseRequestFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <PurchaseDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                  filterLookupCustomer={props.filterLookupCustomer}
                  filterProject={props.filterProject}
                  setProjectFilter={props.handleSetProjectFilter}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <PurchaseItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                classes={{
                  flexContent: props.classes.flexContent,
                  marginFarRight: props.classes.marginFarRight
                }}
              />
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(purchaseMessage.request.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.confirm.createTitle : purchaseMessage.request.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.confirm.createDescription : purchaseMessage.request.confirm.modifyDescription),
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