import AppMenu from '@constants/AppMenu';
import { IKPICategory } from '@kpi/classes/response/category';
import { KPIMeasurementDetail } from '@kpi/components/measurement/Detail/KPIMeasurementDetail';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { DialogConfirmation } from '@layout/components/dialogs';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
// import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { CategoryDetailProps } from './KPICategoryDetail';
import { KPICategoryInformation } from './shared/KPICategoryInformation';

export const KPICategoryDetailView: React.SFC<CategoryDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.KPICategory,
      parentUid: AppMenu.Lookup,
      parentUrl: '/kpi/category',
      title: props.intl.formatMessage(kpiMessage.category.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.category.page.detailSubHeader),
    }}
    state={props.kpiCategoryState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPICategory) => ([
      <KPICategoryInformation data={data}/>
    ])}
    secondary={(data: IKPICategory) => ([
      <KPIMeasurementDetail categoryUid={data.uid}/>
    ])}
    appBarComponent={
      props.menuOptions &&
      <PopupMenu 
        id="kpi-category-option"
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
