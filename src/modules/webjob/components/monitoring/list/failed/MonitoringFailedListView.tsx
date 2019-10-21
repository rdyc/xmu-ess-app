import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobFailed } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringFailedListProps } from './MonitoringFailedList';
import { MonitoringFailedSummary } from './MonitoringFailedSummary';

export const MonitoringFailedListView: React.SFC<MonitoringFailedListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobFailedAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobFailed) => ( 
      <MonitoringFailedSummary data={item}/>
    )}
  />
);