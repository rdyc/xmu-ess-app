import AppMenu from '@constants/AppMenu';
import { IKPIOpen } from '@kpi/classes/response/open';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { KPIOpenSumary } from '../Detail/shared/KPIOpenSummary';
import { KPIOpenListProps } from './KPIOpenList';

export const KPIOpenListView: React.SFC<KPIOpenListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.KPIOpen,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(kpiMessage.open.page.listTitle),
        description: props.intl.formatMessage(kpiMessage.open.page.listSubHeader)
      }}

      // state & fields
      state={props.kpiOpenState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIOpen) => (
        <KPIOpenSumary data={item} />
      )}
      actionComponent={(item: IKPIOpen) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/opens/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/opens/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="KPI.open"
          default={props.kpiOpenState.all.request && props.kpiOpenState.all.request.filter && props.kpiOpenState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/kpi/opens/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
  </React.Fragment>
);