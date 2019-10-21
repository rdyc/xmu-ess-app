import { CollectionPage } from '@layout/components/pages';
import { IWebJobMonitoringJobProcessing } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringProcessingListProps } from './MonitoringProcessingList';
import { MonitoringProcessingSummary } from './MonitoringProcessingSummary';

export const MonitoringProcessingListView: React.SFC<MonitoringProcessingListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobProcessingAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobProcessing) => ( 
      <MonitoringProcessingSummary data={item}/>
    )}
  />
);