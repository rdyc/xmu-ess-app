import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobFetched } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringFetchedListProps } from './MonitoringFetchedList';
import { MonitoringFetchedSummary } from './MonitoringFetchedSummary';

export const MonitoringFetchedListView: React.SFC<MonitoringFetchedListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobFetchedAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobFetched) => ( 
      <MonitoringFetchedSummary data={item}/>
    )}
  />
);