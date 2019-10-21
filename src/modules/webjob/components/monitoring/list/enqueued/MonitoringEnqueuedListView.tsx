import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobEnqueued } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringEnqueuedListProps } from './MonitoringEnqueuedList';
import { MonitoringEnqueuedSummary } from './MonitoringEnqueuedSummary';

export const MonitoringEnqueuedListView: React.SFC<MonitoringEnqueuedListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobEnqueuedAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobEnqueued) => ( 
      <MonitoringEnqueuedSummary data={item}/>
    )}
  />
);