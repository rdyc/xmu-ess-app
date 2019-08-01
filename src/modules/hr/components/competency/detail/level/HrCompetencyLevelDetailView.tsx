import AppMenu from '@constants/AppMenu';
import { IHrCompetencyLevelDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrCompetencyCategoryInformation } from '../category/HrCompetencyCategoryInformation';
import { HrCompetencyClusterInformation } from '../cluster/HrCompetencyClusterInformation';
import { HrCompetencyLevelDetailProps } from './HrCompetencyLevelDetail';
import { HrCompetencyLevelInformation } from './HrCompetencyLevelInformation';

export const HrCompetencyLevelDetailView: React.SFC<HrCompetencyLevelDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/hr/competency',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Level'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyLevelState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyLevelDetail) => ([
      <HrCompetencyLevelInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyLevelDetail) => ([
      <HrCompetencyCategoryInformation data={data.category} />
    ])}
    tertiary={(data: IHrCompetencyLevelDetail) => ([
      <HrCompetencyClusterInformation data={data.category.cluster} />,
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-competency-level-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);