import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IWebJobMonitoringJobScheduled } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringScheduledListProps } from './MonitoringScheduledList';
import { MonitoringScheduledSummary } from './MonitoringScheduledSummary';

export const MonitoringScheduledListView: React.SFC<MonitoringScheduledListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobScheduledAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobScheduled) => ( 
      <MonitoringScheduledSummary data={item}/>
    )}
    actionComponent={(item: IWebJobMonitoringJobScheduled) => (
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