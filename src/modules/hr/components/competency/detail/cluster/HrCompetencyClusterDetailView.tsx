import AppMenu from '@constants/AppMenu';
import { IHrCompetencyClusterDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrCompetencyClusterCategory } from './HrCompetencyClusterCategory';
import { HrCompetencyClusterDetailProps } from './HrCompetencyClusterDetail';
import { HrCompetencyClusterInformation } from './HrCompetencyClusterInformation';

export const HrCompetencyClusterDetailView: React.SFC<HrCompetencyClusterDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.LookupCompetencyCluster,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/competencycluster',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Cluster'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyClusterState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyClusterDetail) => ([
      <HrCompetencyClusterInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyClusterDetail) => ([
      <HrCompetencyClusterCategory items={data.categories} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-competency-cluster-option"
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