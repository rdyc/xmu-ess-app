import { CollectionPage } from '@layout/components/pages';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IWebJobMonitoringJobFetched } from '@webjob/classes/response';
import * as React from 'react';

import { MonitoringFetchedListProps } from './MonitoringFetchedList';
import { MonitoringFetchedSummary } from './MonitoringFetchedSummary';

export const MonitoringFetchedListView: React.SFC<MonitoringFetchedListProps> = props => (
  <CollectionPage
    // state & fields
    state={props.webJobMonitoringState.jobFetchedAll}
    fields={props.fields}

    // callback
    onLoadApi={props.handleOnLoadApi}
    onBind={props.handleOnBind}
    
    // row components
    summaryComponent={(item: IWebJobMonitoringJobFetched) => ( 
      <MonitoringFetchedSummary data={item}/>
    )}
    actionComponent={(item: IWebJobMonitoringJobFetched) => (
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