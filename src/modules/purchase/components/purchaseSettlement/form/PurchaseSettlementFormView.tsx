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
import { IPurchaseSettlementFormValue, PurchaseSettlementFormProps } from './PurchaseSettlementForm';

export const PurchaseSettlementFormView: React.SFC<PurchaseSettlementFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.PurchaseSettlementRequest,
      parentUid: AppMenu.Purchase,
      parentUrl: props.formMode === FormMode.New ? '/purchase/requests' : '/purchase/settlement/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.pages.newTitle : purchaseMessage.request.pages.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.request.pages.newSubTitle : purchaseMessage.request.pages.modifySubTitle)
    }}
    state={props.purchaseSettlementState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IPurchaseSettlementFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <PurchaseDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                  isInIDR={props.isInIDR}
                  classes={{
                    colorBlue: props.classes.colorBlue,
                    colorRed: props.classes.colorRed,
                  }}
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
                  marginFarRight: props.classes.marginFarRight,
                  colorBlue: props.classes.colorBlue,
                  colorRed: props.classes.colorRed,
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
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.settlement.confirm.settleTitle : purchaseMessage.settlement.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? purchaseMessage.settlement.confirm.settleDescription : purchaseMessage.settlement.confirm.modifyDescription),
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