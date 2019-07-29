import AppMenu from '@constants/AppMenu';
import { IKPIMeasurement } from '@KPI/classes/response/measurement';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { KPIMeasurementSumarry } from '../Detail/shared/KPIMeasurementSummary';
import { KPIMeasurementListProps } from './KPIMeasurementList';

export const KPIMeasurementListView: React.SFC<KPIMeasurementListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupCompany,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(KPIMessage.measurement.page.listTitle),
        description: props.intl.formatMessage(KPIMessage.measurement.page.listSubHeader)
      }}

      // state & fields
      state={props.KPIMeasurementState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IKPIMeasurement) => (
        <KPIMeasurementSumarry data={item} />
      )}
      actionComponent={(item: IKPIMeasurement) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/measurement/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/kpi/measurement/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="KPI.measurement"
          default={props.KPIMeasurementState.all.request && props.KPIMeasurementState.all.request.filter && props.KPIMeasurementState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/kpi/measurement/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
  </React.Fragment>
);