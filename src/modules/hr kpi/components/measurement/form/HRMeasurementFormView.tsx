import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { KPIMeasurementFormProps, IKPIMeasurementFormValue } from './KPIMeasurementForm';
import KPIMeasurementDetailPartialForm from './partial/KPIMeasurementDetailPartialForm';

export const KPIMeasurementFormView: React.SFC<KPIMeasurementFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/measurement',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.page.newTitle : KPIMessage.measurement.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.page.newSubHeader : KPIMessage.measurement.page.modifySubHeader)
    }}
    state={props.KPIMeasurementState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IKPIMeasurementFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <KPIMeasurementDetailPartialForm
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                />
              </div>
            </div>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm
                  title={props.intl.formatMessage(KPIMessage.measurement.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.dialog.createTitle : KPIMessage.measurement.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.measurement.dialog.createDescription : KPIMessage.measurement.dialog.modifyDescription),
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