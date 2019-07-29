import AppMenu from '@constants/AppMenu';
import { IHRMeasurement } from '@hr/classes/response/measurement';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { HRMeasurementSumarry } from '../Detail/shared/HRMeasurementSummary';
import { HRMeasurementListProps } from './HRMeasurementList';

export const HRMeasurementListView: React.SFC<HRMeasurementListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupCompany,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(hrMessage.measurement.page.listTitle),
        description: props.intl.formatMessage(hrMessage.measurement.page.listSubHeader)
      }}

      // state & fields
      state={props.hrMeasurementState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IHRMeasurement) => (
        <HRMeasurementSumarry data={item} />
      )}
      actionComponent={(item: IHRMeasurement) => (
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
          key="hr.measurement"
          default={props.hrMeasurementState.all.request && props.hrMeasurementState.all.request.filter && props.hrMeasurementState.all.request.filter.find}
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