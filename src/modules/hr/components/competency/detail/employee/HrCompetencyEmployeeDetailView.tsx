import AppMenu from '@constants/AppMenu';
import { IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrInputInformation } from '../../shared/HrInputInformation';
import { HrCompetencyEmployeeCategoryItem } from './HrCompetencyEmployeeCategoryItem';
import { HrCompetencyEmployeeDetailProps } from './HrCompetencyEmployeeDetail';
import { HrCompetencyEmployeeInformation } from './HrCompetencyEmployeeInformation';

export const HrCompetencyEmployeeDetailView: React.SFC<HrCompetencyEmployeeDetailProps> = props => (
  <React.Fragment>
    <PreviewPage 
      info={{
        uid: AppMenu.CompetencyAssessmentInput,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/hr/assessmentinput',
        title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: '360 Assessment Input'}),
        description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
      }}
      state={props.hrCompetencyEmployeeState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IHrCompetencyEmployeeDetail) => ([
        <HrCompetencyEmployeeInformation data={data} />
      ])}
      secondary={() => ([
        <HrInputInformation />
      ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu
          id="hr-competency-assessment-input-option"
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
    {
      props.hrCompetencyMappedState.list.isLoading &&
      <LoadingCircular />
    }
    {
      !props.hrCompetencyEmployeeState.detail.isLoading &&
      props.hrCompetencyEmployeeState.detail.response &&
      props.hrCompetencyEmployeeState.detail.response.data &&
      !props.hrCompetencyMappedState.list.isLoading &&
      props.hrCompetencyMappedState.list.response &&
      props.hrCompetencyMappedState.list.response.data &&
      props.hrCompetencyMappedState.list.response.data[0] &&
      <HrCompetencyEmployeeCategoryItem 
        data={props.hrCompetencyEmployeeState.detail.response.data}
        mapped={props.hrCompetencyMappedState.list.response.data[0]}        
      />
    }
  </React.Fragment>
);