import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
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
    actionComponent={(item: IWebJobMonitoringJobSucceeded) => (
      <React.Fragment>
        <Button 
          size="small"
          color="secondary"
          onClick={() => props.history.push(`/webjob/monitoring/jobs/${props.match.params.type}/${item.id}`)}
        >
          {props.intl.formatMessage(layoutMessage.action.details)}
        </Button>
      </React.Fragment>
    )}
  />
);