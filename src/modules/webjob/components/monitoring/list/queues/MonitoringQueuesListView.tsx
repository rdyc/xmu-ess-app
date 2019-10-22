import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
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
    actionComponent={(item: IWebJobMonitoringQueue) => (
      <React.Fragment>
        <Button 
          size="small"
          color="secondary"
          disabled
          // onClick={() => props.history.push(`/webjob/monitoring/jobs/${props.match.params.type}/${item.id}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
      </React.Fragment>
    )}
  />
);