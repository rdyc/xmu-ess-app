import AppMenu from '@constants/AppMenu';
import { IHrCompetencyMappedDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
import * as React from 'react';
import { HrCompetencyCategoryItemDetail } from './HrCompetencyCategoryItemDetail';
import { HrCompetencyMappedDetailProps } from './HrCompetencyMappedDetail';
import { HrCompetencyMappedInformation } from './HrCompetencyMappedInformation';

export const HrCompetencyMappedDetailView: React.SFC<HrCompetencyMappedDetailProps> = props => (
  <PreviewPage 
    info={{
      uid: AppMenu.CompetencyMapped,
      parentUid: AppMenu.Lookup,
      parentUrl: '/hr/competency/mapped',
      title: props.intl.formatMessage(hrMessage.shared.page.detailTitle, {state: 'Mapping'}),
      description: props.intl.formatMessage(hrMessage.shared.page.detailSubHeader)
    }}
    state={props.hrCompetencyMappedState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IHrCompetencyMappedDetail) => ([
      <HrCompetencyMappedInformation data={data} />
    ])}
    secondary={(data: IHrCompetencyMappedDetail) => ([
      <HrCompetencyCategoryItemDetail data={data} />
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