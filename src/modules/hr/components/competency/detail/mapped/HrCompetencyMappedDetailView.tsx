import AppMenu from '@constants/AppMenu';
import { IHrCompetencyMappedDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrCompetencyCategoryInformation } from '../category/HrCompetencyCategoryInformation';
import { HrCompetencyMappedDetailProps } from './HrCompetencyMappedDetail';
import { HrCompetencyMappedInformation } from './HrCompetencyMappedInformation';

export const HrCompetencyMappedDetailView: React.SFC<HrCompetencyMappedDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      parentUrl: '/hr/competency',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Mapped'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyMappedState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyMappedDetail) => ([
      <HrCompetencyMappedInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyMappedDetail) => ([
      <HrCompetencyCategoryInformation data={data.category} />
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu
        id="hr-competency-mapped-option"
        selectable={false}
        menuOptions={props.menuOptions}
        onSelected={props.handleOnSelectedMenu}
      />
    }
  />
);