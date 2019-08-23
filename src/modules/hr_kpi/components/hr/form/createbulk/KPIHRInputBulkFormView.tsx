import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { IKPIEmployeeBulkFormValue, KPIHRInputBulkFormProps } from './KPIHRInputBulkForm';
import KPIHRInputBulkDetailPartialForm from './partial/KPIHRInputBulkDetailPartialForm';

export const KPIHRInputBulkFormView: React.SFC<KPIHRInputBulkFormProps> = props => {
  return (
    <FormPage
      info={{
        uid: AppMenu.KPITemplate,
        parentUid: AppMenu.Lookup,
        parentUrl: '/kpi/templates',
        title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.page.newTitle : kpiMessage.template.page.modifyTitle),
        description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.page.newSubHeader : kpiMessage.template.page.modifySubHeader)
      }}
      state={props.kpiEmployeeState.detail}
      onLoadApi={props.handleOnLoadDetail}
    >
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IKPIEmployeeBulkFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <KPIHRInputBulkDetailPartialForm
                    formMode={props.formMode}
                    formikBag={formikBag}
                    intl={props.intl}
                    filterLookupCompany={props.filterLookupCompany}
                    filterKPITemplate={props.filterKPITemplate}
                    handleLoadTemplate={props.handleLoadTemplate}
                    handleSetTemplateFilter={props.handleSetTemplateFilter}
                  />
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <SubmissionForm
                    title={props.intl.formatMessage(kpiMessage.template.submission.form)}
                    className={props.classes.flexContent}
                    formikProps={formikBag}
                    buttonLabelProps={{
                      reset: props.intl.formatMessage(layoutMessage.action.reset),
                      submit: props.intl.formatMessage(layoutMessage.action.submit),
                      processing: props.intl.formatMessage(layoutMessage.text.processing)
                    }}
                    confirmationDialogProps={{
                      title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.dialog.createTitle : kpiMessage.template.dialog.modifyTitle),
                      message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.dialog.createDescription : kpiMessage.template.dialog.modifyDescription),
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

            <div className={props.classes.flexRow}>
              {/* <KPITemplateItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                classes={props.classes}
                filterKPICategory={props.filterKPICategory}
                filterKPIMeasurement={props.filterKPIMeasurement}
                isDialogFullScreen={isMobile}
              /> */}
            </div>
          </Form>
        )}
      />
    </FormPage>
  );
};