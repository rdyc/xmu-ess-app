import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ICompetencyAssessmentFormValue } from '../../form/assessment/CompetencyAssessmentForm';
import { CompetencyAssessmentResponder } from '../../form/assessment/CompetencyAssessmentResponder';
import { HrCompetencyResultRespond } from '../result/shared/HrCompetencyResultRespond';
import { HrAssessmentResponderItem } from './HrAssessmentResponderItem';
import { HrCompetencyAssessmentDetailProps } from './HrCompetencyAssessmentDetail';
import { HrCompetencyAssessmentInformation } from './HrCompetencyAssessmentInformation';

export const HrCompetencyAssessmentDetailView: React.SFC<HrCompetencyAssessmentDetailProps> = props => (
  <React.Fragment>
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleOnSubmit}
      render={(formikBag: FormikProps<ICompetencyAssessmentFormValue>) => (
        <Form>
          <PreviewPage 
            info={{
              uid: AppMenu.CompetencyAssessment,
              parentUid: AppMenu.HumanResource,
              parentUrl: `/hr/assessment/${props.match.params.employeeUid}`,
              title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: '360 Assessment'}),
              description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
            }}
            state={props.hrCompetencyAssessmentState.detail}
            onLoadApi={props.handleOnLoadApi}
            primary={(data: IHrCompetencyAssessmentDetail) => ([
              <HrCompetencyAssessmentInformation data={data} />
            ])}
            secondary={(data: IHrCompetencyAssessmentDetail) => ([
              props.formMode === FormMode.View ?
              <HrAssessmentResponderItem data={data} handleOnModify={data.statusType !== WorkflowStatusType.Closed ? props.handleOnModify : undefined} />
              :
              <CompetencyAssessmentResponder
                formMode={props.formMode}
                intl={props.intl}
                formikBag={formikBag}
                filterAccountEmployee={props.filterAccountEmployee}
                data={props.hrCompetencyAssessmentState.detail.response && props.hrCompetencyAssessmentState.detail.response.data}
                creator={props.userState && props.userState.user && props.userState.user.uid}
                filterCommonSystem={props.filterCommonSystem}
                handleOnModify={props.handleOnModify}
              />
            ])}
            tertiary={() => ([
              <React.Fragment>
                {
                  props.formMode === FormMode.Edit &&
                  <React.Fragment>
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
                      title: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Assessment Result'}),
                      message: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'assessment result'}),
                      labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                      labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                    }} 
                    />
                    <FormikJsonValues formikBag={formikBag} />
                  </React.Fragment>
                }
              </React.Fragment>
            ])}
            appBarComponent={
              props.menuOptions &&
              <PopupMenu
                id="hr-competency-assessment-option"
                selectable={false}
                menuOptions={props.menuOptions}
                onSelected={props.handleOnSelectedMenu}
              />
            }
          />
        </Form>
      )}
    />
    
    <DialogConfirmation 
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />  
    {
      !props.hrCompetencyEmployeeState.result.isLoading &&
      props.hrCompetencyEmployeeState.result.response &&
      props.hrCompetencyEmployeeState.result.response.data &&
      props.hrCompetencyResultState.detailList.response &&
      props.hrCompetencyResultState.detailList.response.data &&
      <HrCompetencyResultRespond 
        data={props.hrCompetencyEmployeeState.result.response.data}
        responders={props.hrCompetencyResultState.detailList.response.data}
      />
    }
  </React.Fragment>
);