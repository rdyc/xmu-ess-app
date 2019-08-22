import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import { isWidthDown } from '@material-ui/core/withWidth';
import { IKPIEmployeeFormValue, KPIHRInputFormProps } from './KPIHRInputForm';
import KPIHRInputDetailPartialForm from './partial/KPIHRInputDetailPartialForm';
import KPIHRInputItemPartialForm from './partial/KPIHRInputItemPartialForm';

export const KPIHRInputFormView: React.SFC<KPIHRInputFormProps> = props => {
  const isMobile = isWidthDown('sm', props.width);
  
  return (
    <FormPage
      info={{
        uid: AppMenu.HRKPIInput,
        parentUid: AppMenu.HumanResource,
        parentUrl: `/kpi/hrinputs/${props.history.location.state.employeeUid}`,
        title: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.newTitle : kpiMessage.employee.page.modifyTitle),
        description: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.employee.page.newSubHeader : kpiMessage.employee.page.modifySubHeader)
      }}
      state={props.kpiEmployeeState.detail}
      onLoadApi={props.handleOnLoadDetail}
    >
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IKPIEmployeeFormValue>) => (
          <Form>
            <div className={props.classes.flexRow}>
              <div className={props.classes.flexColumn}>
                <div className={props.classes.flexContent}>
                  <KPIHRInputDetailPartialForm
                    formMode={props.formMode}
                    formikBag={formikBag}
                    intl={props.intl}
                    filterLookupCompany={props.filterLookupCompany}
                    filterKPITemplate={props.filterKPITemplate}
                    handleSetTemplateFilter={props.handleSetTemplateFilter}
                    handleLoadTemplate={props.handleLoadTemplate}
                  />
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

            <div className={props.classes.flexRow}>
              <KPIHRInputItemPartialForm
                formikBag={formikBag}
                formMode={props.formMode}
                intl={props.intl}
                classes={props.classes}
                filterKPICategory={props.filterKPICategory}
                filterKPIMeasurement={props.filterKPIMeasurement}
                isDialogFullScreen={isMobile}
              />
            </div>
          </Form>
        )}
      />
    </FormPage>
  );
};