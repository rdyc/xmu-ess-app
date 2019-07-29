import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { HRTemplateFormProps, IHRTemplateFormValue } from './HRTemplateForm';
import HRTemplateDetailPartialForm from './partial/HRTemplateDetailPartialForm';
import HRTemplateItemPartialForm from './partial/HRTemplateItemPartialForm';

export const HRTemplateFormView: React.SFC<HRTemplateFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.LookupEmployee,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/templates',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.page.newTitle : hrMessage.template.page.modifyTitle),
      description: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.page.newSubHeader : hrMessage.template.page.modifySubHeader)
    }}
    state={props.hrTemplateState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<IHRTemplateFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HRTemplateDetailPartialForm
                  formMode={props.formMode}
                  formikBag={formikBag}
                  intl={props.intl}
                  filterLookupCompany={props.filterLookupCompany}
                />
              </div>
            </div>
            <div className={props.classes.flexColumn}>
              <HRTemplateItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                classes={{
                  flexContent: props.classes.flexContent,
                  marginFarRight: props.classes.marginFarRight
                }}
                filterCommonSystem={props.filterCommonSystem}
                filterMeasurement={props.filterMeasurement}
              />
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm
                  title={props.intl.formatMessage(hrMessage.template.submission.form)}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.dialog.createTitle : hrMessage.template.dialog.modifyTitle),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.dialog.createDescription : hrMessage.template.dialog.modifyDescription),
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