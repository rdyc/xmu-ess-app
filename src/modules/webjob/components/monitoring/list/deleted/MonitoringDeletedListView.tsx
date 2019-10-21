import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobDeleted } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringDeletedListProps } from './MonitoringDeletedList';
import { MonitoringDeletedSummary } from './MonitoringDeletedSummary';

export const MonitoringDeletedListView: React.SFC<MonitoringDeletedListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobDeletedAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobDeleted) => ( 
      <MonitoringDeletedSummary data={item}/>
    )}
  />
);