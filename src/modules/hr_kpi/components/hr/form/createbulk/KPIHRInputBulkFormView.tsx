import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { KPITemplateItem } from '@kpi/components/template/detail/shared/KPITemplateItem';
import { IKPIEmployeeBulkFormValue, KPIHRInputBulkFormProps } from './KPIHRInputBulkForm';
import KPIHRInputBulkDetailPartialForm from './partial/KPIHRInputBulkDetailPartialForm';
import KPIHRInputBulkEmployeePartialForm from './partial/KPIHRInputBulkEmployeePartialForm';

export const KPIHRInputBulkFormView: React.SFC<KPIHRInputBulkFormProps> = props => {
  return (
    <FormPage
      info={{
        uid: AppMenu.KPITemplate,
        parentUid: AppMenu.Lookup,
        parentUrl: '/kpi/employees',
        title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.newTitle : kpiMessage.employee.page.modifyTitle),
        description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.newSubHeader : kpiMessage.employee.page.modifySubHeader)
      }}
      state={props.kpiEmployeeState.detail}
      onLoadApi={() => {
        //
      }}
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
                    handleSetFilter={props.handleSetFilter}
                    handleLoadTemplate={props.handleLoadTemplate}
                    handleLoadEmployee={props.handleLoadEmployee}
                  />
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <KPIHRInputBulkEmployeePartialForm
                    formMode={props.formMode}
                    loadItem={props.loadItem}
                    handleSetLoadItem={props.handleSetLoadItem}
                    formikBag={formikBag}
                    intl={props.intl}
                  />
                  {/* {
                    formikBag.values.companyUid !== '' &&
                    formikBag.values.positionUid !== '' &&
                    props.loadItem &&
                    formikBag.setValues({
                      companyUid: formikBag.values.companyUid,
                      positionUid: formikBag.values.positionUid,
                      templateUid: formikBag.values.templateUid,
                      year: formikBag.values.year,
                      period: formikBag.values.period,
                      employees: props.initialValues.employees,
                    })
                  } */}
                </div>
              </div>

              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <SubmissionForm
                    title={props.intl.formatMessage(kpiMessage.employee.submission.form)}
                    className={props.classes.flexContent}
                    formikProps={formikBag}
                    buttonLabelProps={{
                      reset: props.intl.formatMessage(layoutMessage.action.reset),
                      submit: props.intl.formatMessage(layoutMessage.action.submit),
                      processing: props.intl.formatMessage(layoutMessage.text.processing)
                    }}
                    confirmationDialogProps={{
                      title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.dialog.createTitle : kpiMessage.employee.dialog.modifyTitle),
                      message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.dialog.createDescription : kpiMessage.employee.dialog.modifyDescription),
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

            {
              props.kpiTemplateState.detail.response &&
              props.kpiTemplateState.detail.response.data &&
              props.kpiTemplateState.detail.response.data.items &&
              <KPITemplateItem 
                items={props.kpiTemplateState.detail.response.data.items}
              />
            }
          </Form>
        )}
      />
    </FormPage>
  );
};