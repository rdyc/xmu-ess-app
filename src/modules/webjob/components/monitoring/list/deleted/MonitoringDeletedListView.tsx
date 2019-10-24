import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
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

    actionComponent={(item: IWebJobMonitoringJobDeleted) => (
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