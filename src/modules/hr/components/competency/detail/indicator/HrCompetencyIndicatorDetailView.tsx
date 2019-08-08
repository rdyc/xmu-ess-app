import AppMenu from '@constants/AppMenu';
import { IHrCompetencyIndicatorDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
// import { HrCompetencyCategoryInformation } from '../category/HrCompetencyCategoryInformation';
// import { HrCompetencyClusterInformation } from '../cluster/HrCompetencyClusterInformation';
import { HrCompetencyLevelInformation } from '../level/HrCompetencyLevelInformation';
import { HrCompetencyIndicatorDetailProps } from './HrCompetencyIndicatorDetail';
import { HrCompetencyIndicatorInformation } from './HrCompetencyIndicatorInformation';

export const HrCompetencyIndicatorDetailView: React.SFC<HrCompetencyIndicatorDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.LookupCompetencyCluster,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/competency',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Indicator'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyIndicatorState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyIndicatorDetail) => ([
      <HrCompetencyIndicatorInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyIndicatorDetail) => ([
      <HrCompetencyLevelInformation data={data.level} />,
      // <HrCompetencyClusterInformation data={data.level.category.cluster} />,
    ])}
    tertiary={(data: IHrCompetencyIndicatorDetail) => ([
      // <HrCompetencyCategoryInformation data={data.level.category} />,
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-competency-indicator-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);