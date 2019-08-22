import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { CompetencyAssessmentFormProps, ICompetencyAssessmentFormValue } from './CompetencyAssessmentForm';
import CompetencyAssessmentPartial from './CompetencyAssessmentPartial';
// import CompetencyAssessmentResponden from './CompetencyAssessmentResponden';
import CompetencyAssessmentResponder from './CompetencyAssessmentResponder';

export const CompetencyAssessmentFormView: React.SFC<CompetencyAssessmentFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.CompetencyAssessment,
      parentUid: AppMenu.HumanResource,
      parentUrl: '/hr/competencyassessment',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: 'Assessment'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: 'Assessment'})
    }}
    state={props.hrCompetencyClusterState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICompetencyAssessmentFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CompetencyAssessmentPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterCompany={props.filterCompany}
                  filterPosition={props.filterPosition}
                  // filterAccountEmployee={props.filterResponden}
                  // handleFilterEmployee={props.handleFilterEmployee}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CompetencyAssessmentResponder
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  classes={{
                    marginFarRight: props.classes.marginFarRight,
                    marginWideTop: props.classes.marginWideTop
                  }}
                  filterAccountEmployee={props.filterAccountEmployee}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <SubmissionForm 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: 'Assessment'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createTitle : hrMessage.shared.confirm.modifyTitle, {state: 'Assessment'}),
                    message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.confirm.createDescription : hrMessage.shared.confirm.modifyDescription, {state: 'Assessment'}),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </div>
              <div className={props.classes.flexContent}>
                <FormikJsonValues formikBag={formikBag} />
              </div>
            </div>
            {/* <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CompetencyAssessmentResponden
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  classes={{
                    marginFarRight: props.classes.marginFarRight,
                    marginWideTop: props.classes.marginWideTop
                  }}
                  filterAccountEmployee={props.filterAccountEmployee}
                />
              </div>
            </div> */}
          </div>
        </Form>
      )}
    />
  </FormPage>
);