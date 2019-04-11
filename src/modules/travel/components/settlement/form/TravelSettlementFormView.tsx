import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import TravelDetailPartialForm from './partials/TravelDetailPartialForm';
import TravelItemPartialForm from './partials/TravelItemPartialForm';
import { ITravelSettlementFormValue, TravelSettlementFormProps } from './TravelSettlementForm';

export const PurchaseSettlementFormView: React.SFC<TravelSettlementFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.TravelSettlementRequest,
      parentUid: AppMenu.Travel,
      parentUrl: props.formMode === FormMode.New ? '/travel/requests' : '/travel/settlement/requests',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.page.newTitle : travelMessage.settlement.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.page.newSubHeader : travelMessage.settlement.page.modifySubHeader)
    }}
    state={props.formMode === FormMode.New ? props.travelRequestState.detail : props.travelSettlementState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ITravelSettlementFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <TravelDetailPartialForm 
                  formikBag={formikBag}
                  formMode={props.formMode}
                  intl={props.intl}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <TravelItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                filterCommonSystem={props.filterCommonSystem}
                classes={{
                  flexContent: props.classes.flexContent,
                  marginFarRight: props.classes.marginFarRight,
                }}
              />
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(travelMessage.settlement.section.submit)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.dialog.createTitle : travelMessage.settlement.confirm.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? travelMessage.settlement.dialog.createDescription : travelMessage.settlement.confirm.modifyDescription),
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