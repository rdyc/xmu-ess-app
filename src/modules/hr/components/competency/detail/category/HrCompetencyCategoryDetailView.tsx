import AppMenu from '@constants/AppMenu';
import { IHrCompetencyCategoryDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
// import { HrCompetencyClusterInformation } from '../cluster/HrCompetencyClusterInformation';
import { HrCompetencyCategoryDetailProps } from './HrCompetencyCategoryDetail';
import { HrCompetencyCategoryInformation } from './HrCompetencyCategoryInformation';

export const HrCompetencyCategoryDetailView: React.SFC<HrCompetencyCategoryDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.LookupCompetencyCluster,
      parentUid: AppMenu.Lookup,
      parentUrl: '/lookup/competency',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Category'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyCategoryState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyCategoryDetail) => ([
      <HrCompetencyCategoryInformation data={data} />
    ])}
    // secondary={(data: IHrCompetencyCategoryDetail) => ([
    //   <HrCompetencyClusterInformation data={data.cluster} />
    // ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-competency-category-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);