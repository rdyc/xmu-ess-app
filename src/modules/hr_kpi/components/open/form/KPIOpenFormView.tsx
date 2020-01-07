import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IKPIOpenFormValue, KPIOpenFormProps  } from './KPIOpenForm';
import KPIOpenDetailPartialForm from './partial/KPIOpenDetailPartialForm';

export const KPIOpenFormView: React.SFC<KPIOpenFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.KPIOpen,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/opens',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.page.newTitle : kpiMessage.open.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.page.newSubHeader : kpiMessage.open.page.modifySubHeader)
    }}
    state={props.kpiOpenState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IKPIOpenFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <KPIOpenDetailPartialForm
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                />
              </div>
            </div>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm
                  title={props.intl.formatMessage(kpiMessage.open.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.dialog.createTitle : kpiMessage.open.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.dialog.createDescription : kpiMessage.open.dialog.modifyDescription),
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