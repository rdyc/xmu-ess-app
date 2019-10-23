import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
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
    actionComponent={(item: IWebJobMonitoringJobProcessing) => (
      <React.Fragment>
        <Button 
          size="small"
          color="secondary"
          onClick={() => props.history.push(`/webjob/monitoring/${props.match.params.type}/${item.id}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
      </React.Fragment>
    )}
  />
);