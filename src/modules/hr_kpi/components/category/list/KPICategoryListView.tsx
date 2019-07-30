import AppMenu from '@constants/AppMenu';
import { IKPICategory } from '@kpi/classes/response/category';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { KPICategorySumarry } from '../Detail/shared/KPICategorySummary';
import { KPICategoryListProps } from './KPICategoryList';

export const KPICategoryListView: React.SFC<KPICategoryListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupCompany,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(kpiMessage.category.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.category.page.listSubHeader)
      }}

      // state & fields
      state={props.kpiCategoryState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPICategory) => (
        <KPICategorySumarry data={item} />
      )}
      actionComponent={(item: IKPICategory) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/category/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/category/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="KPI.category"
          default={props.kpiCategoryState.all.request && props.kpiCategoryState.all.request.filter && props.kpiCategoryState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/kpi/category/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
  </React.Fragment>
);