import AppMenu from '@constants/AppMenu';
import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrAssessmentResponderItem } from './HrAssessmentResponderItem';
import { HrCompetencyAssessmentDetailProps } from './HrCompetencyAssessmentDetail';
import { HrCompetencyAssessmentInformation } from './HrCompetencyAssessmentInformation';

export const HrCompetencyAssessmentDetailView: React.SFC<HrCompetencyAssessmentDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.CompetencyAssessment,
      parentUid: AppMenu.HumanResource,
      parentUrl: `/hr/assessment/${props.match.params.employeeUid}`,
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Assessment'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyAssessmentState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyAssessmentDetail) => ([
      <HrCompetencyAssessmentInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyAssessmentDetail) => ([
      <HrAssessmentResponderItem data={data} />
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
  >
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
  </PreviewPage>
);