import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HRMeasurementFormProps, IHRMeasurementFormValue } from './HRMeasurementForm';
import HRMeasurementDetailPartialForm from './partial/HRMeasurementDetailPartialForm';

export const HRMeasurementFormView: React.SFC<HRMeasurementFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/measurement',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.page.newTitle : hrMessage.measurement.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.page.newSubHeader : hrMessage.measurement.page.modifySubHeader)
    }}
    state={props.hrMeasurementState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IHRMeasurementFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HRMeasurementDetailPartialForm
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
                  title={props.intl.formatMessage(hrMessage.measurement.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.dialog.createTitle : hrMessage.measurement.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.measurement.dialog.createDescription : hrMessage.measurement.dialog.modifyDescription),
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