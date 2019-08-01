import AppMenu from '@constants/AppMenu';
import { IHrCompetencyClusterDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrCompetencyClusterDetailProps } from './HrCompetencyClusterDetail';
import { HrCompetencyClusterInformation } from './HrCompetencyClusterInformation';

export const HrCompetencyClusterDetailView: React.SFC<HrCompetencyClusterDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/hr/competency',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Cluster'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyClusterState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyClusterDetail) => ([
      <HrCompetencyClusterInformation data={data} />
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
  />
);