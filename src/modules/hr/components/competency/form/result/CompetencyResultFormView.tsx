import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { FormPage } from '@layout/components/pages/formPage/FormPage';
import { SubmissionDraft } from '@layout/components/submission/SubmissionDraft';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { HrCompetencyResponderItem } from '../../detail/result/shared/HrCompetencyResponderItem';
import { CompetencyResultCategory } from './CompetencyResultCategory';
import { CompetencyResultFormProps, ICompetencyResultFormValue } from './CompetencyResultForm';
import CompetencyResultPartial from './CompetencyResultPartial';

export const CompetencyResultFormView: React.SFC<CompetencyResultFormProps> = props => (
  <FormPage
    info={{
      uid: AppMenu.CompetencyAssessmentResult,
      parentUid: AppMenu.HumanResource,
      parentUrl: '/hr/assessmentresult',
      title: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.page.newTitle :  hrMessage.shared.page.modifyTitle, {state: '360 Assessment Result'}),
      description: props.intl.formatMessage(props.formMode === FormMode.New ?  hrMessage.shared.page.newSubHeader :  hrMessage.shared.page.modifySubHeader, {state: '360 Assessment Result'})
    }}
    state={props.hrCompetencyResultState.detail}
    onLoadApi={props.handleOnLoadDetail}
  >
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICompetencyResultFormValue>) => (
        <Form>
          <div className={props.classes.flexRow}>
            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <CompetencyResultPartial 
                  formMode={props.formMode}
                  intl={props.intl}
                  formikBag={formikBag}
                  filterCompany={props.filterCompany}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
                <HrCompetencyResponderItem 
                  positionUid={props.history.location.state && props.history.location.state.positionUid}
                  data={props.hrCompetencyResultState.detailList.response && props.hrCompetencyResultState.detailList.response.data}
                />
              </div>
            </div>

            <div className={props.classes.flexColumn}>
              <div className={props.classes.flexContent}>
              <SubmissionDraft 
                  title={props.intl.formatMessage(hrMessage.shared.section.submission, {state: '360 Assessment Result'})}
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
                  isFinal={formikBag.values.levelRespond.every(item => item.levelUid === '')}
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
                <CompetencyResultCategory 
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