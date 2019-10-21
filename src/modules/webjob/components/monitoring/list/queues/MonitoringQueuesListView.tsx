import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringQueue } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringQueuesListProps } from './MonitoringQueuesList';
import { MonitoringQueuesSummary } from './MonitoringQueuesSummary';

export const MonitoringQueuesListView: React.SFC<MonitoringQueuesListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.queueAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringQueue) => ( 
      <MonitoringQueuesSummary data={item}/>
    )}
  />
);