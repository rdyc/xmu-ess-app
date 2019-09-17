import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionDraft } from '@layout/components/submission/SubmissionDraft';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { CompetencyEmployeeCategory } from './CompetencyEmployeeCategory';
import { CompetencyEmployeeFormProps, ICompetencyEmployeeFormValue } from './CompetencyEmployeeForm';
import CompetencyEmployeePartial from './CompetencyEmployeePartial';

export const CompetencyEmployeeFormView: React.SFC<CompetencyEmployeeFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.CompetencyAssessmentInput,
      parentUid: AppMenu.HumanResource,
      parentUrl: '/hr/assessmentinput',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: '360 Assessment Input'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: '360 Assessment Input'})
    }}
    state={props.hrCompetencyEmployeeState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      // validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICompetencyEmployeeFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CompetencyEmployeePartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterCompany={props.filterCompany}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
              <SubmissionDraft 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: '360 Assessment Input'})}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogDraftProps={{
                    title: props.intl.formatMessage(hrMessage.shared.confirm.saveAsTitle, {state: 'draft'}),
                    message: props.intl.formatMessage(hrMessage.shared.confirm.saveAsDescription, {state: 'draft'}),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }}
                  confirmationDialogFinalProps={{
                    title: props.intl.formatMessage(hrMessage.shared.confirm.saveAsTitle, {state: 'final'}),
                    message: props.intl.formatMessage(hrMessage.shared.confirm.saveAsDescription, {state: 'final'}),
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }}  
                  saveAs={props.handleSaveType}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <FormikJsonValues formikBag={formikBag} />
              </div>
            </div>
          </div>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexContent}>
              {
                props.hrCompetencyMappedState.list.response &&
                props.hrCompetencyMappedState.list.response.data &&
                props.hrCompetencyMappedState.list.response.data[0] &&
                <CompetencyEmployeeCategory 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  data={props.hrCompetencyMappedState.list.response.data[0]}
                />
              }
            </div>
          </div>
        </Form>
      )}
    />
  </FormPage>
);