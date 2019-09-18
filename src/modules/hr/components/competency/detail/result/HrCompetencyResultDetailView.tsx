import AppMenu from '@constants/AppMenu';
import { IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { HrCompetencyResultDetailProps } from './HrCompetencyResultDetail';
import { HrCompetencyResultInformation } from './HrCompetencyResultInformation';
// import { HrCompetencyResponderItem } from './shared/HrCompetencyResponderItem';
import { HrCompetencyResultRespond } from './shared/HrCompetencyResultRespond';

export const HrCompetencyResultDetailView: React.SFC<HrCompetencyResultDetailProps> = props => (
  <React.Fragment>
    <PreviewPage 
      info={{
        uid: AppMenu.CompetencyAssessmentResult,
        parentUid: AppMenu.HumanResource,
        parentUrl: '/hr/assessmentresult',
        title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: '360 Assessment Result'}),
        description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
      }}
      state={props.hrCompetencyEmployeeState.detail}
      onLoadApi={props.handleOnLoadApi}
      primary={(data: IHrCompetencyEmployeeDetail) => ([
        <HrCompetencyResultInformation data={data} />
      ])}
      // secondary={(data: IHrCompetencyEmployeeDetail) => ([
      //   <HrCompetencyResponderItem positionUid={data.positionUid} data={props.hrCompetencyResultState.detailList.response && props.hrCompetencyResultState.detailList.response.data} />
      // ])}
      appBarComponent={
        props.menuOptions &&
        <PopupMenu
          id="hr-competency-assessment-result-option"
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
      !props.hrCompetencyEmployeeState.detail.isLoading &&
      (
        props.hrCompetencyEmployeeState.detail.response &&
        props.hrCompetencyEmployeeState.detail.response.data &&
        props.hrCompetencyEmployeeState.detail.response.data.items.length > 0 ?
        <HrCompetencyResultRespond 
          data={props.hrCompetencyEmployeeState.detail.response.data}
        />
        :
        <Card square>
          <CardHeader
            title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Respond'})}
          />
          <CardContent>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              value={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'No item is recorded'})}
            />
          </CardContent>
        </Card>
      )
    }
  </React.Fragment>
);