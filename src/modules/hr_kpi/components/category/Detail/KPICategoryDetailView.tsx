import AppMenu from '@constants/AppMenu';
import { IKPICategory } from '@kpi/classes/response/category';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { PreviewPage } from '@layout/components/pages/PreviewPage/PreviewPage';
import { PopupMenu } from '@layout/components/PopupMenu';
// import { Delete } from '@lookup/components/shared/Delete';
import * as React from 'react';
import { CategoryDetailProps } from './KPICategoryDetail';
import { KPICategoryInformation } from './shared/KPICategoryInformation';

export const KPICategoryDetailView: React.SFC<CategoryDetailProps> = props => (
  <PreviewPage
    info={{
      uid: AppMenu.LookupCompany,
      parentUid: AppMenu.Lookup,
      parentUrl: 'kpi/category',
      title: props.intl.formatMessage(kpiMessage.category.page.detailTitle),
      description: props.intl.formatMessage(kpiMessage.category.page.detailSubHeader),
    }}
    state={props.kpiCategoryState.detail}
    onLoadApi={props.handleOnLoadApi}
    primary={(data: IKPICategory) => ([
      <KPICategoryInformation data={data}/>
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
  </PreviewPage>
);
