import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobSucceeded } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringSucceededListProps } from './MonitoringSucceededList';
import { MonitoringSucceededSummary } from './MonitoringSucceededSummary';

export const MonitoringSucceededListView: React.SFC<MonitoringSucceededListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobSucceededAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobSucceeded) => ( 
      <MonitoringSucceededSummary data={item}/>
    )}
  />
);