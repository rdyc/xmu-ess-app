import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { MonitoringJobsItem } from '@webjob/classes/types/monitoring/MonitoringJobsItem';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { WebJobMonitoringTab } from '@webjob/components/tabs/WebJobMonitoringTab';
import * as React from 'react';
import { MonitoringJobsItemTabs } from '../shared/MonitoringJobsitemTabs';
import { MonitoringDeletedList } from './deleted/MonitoringDeletedList';
import { MonitoringEnqueuedList } from './enqueued/MonitoringEnqueuedList';
import { MonitoringFailedList } from './failed/MonitoringFailedList';
import { MonitoringFetchedList } from './fetched/MonitoringFetchedList';
import { MonitoringProcessingList } from './processing/MonitoringProcessingList';
import { MonitoringQueuesList } from './queues/MonitoringQueuesList';
import { MonitoringScheduledList } from './scheduled/MonitoringScheduledList';
import { MonitoringSucceededList } from './succeeded/MonitoringSucceededList';
import { WebJobMonitoringListProps } from './WebJobMonitoringList';

export const WebJobMonitoringListView: React.SFC<WebJobMonitoringListProps> = props => {
  const { isLoading, response } = props.webJobMonitoringState.statisticAll;
  const { match } = props;

  const handlerList = () => {
    switch (match.params.type) {
      case  MonitoringJobsItem.Succeeded:
        return <MonitoringSucceededList />;

      case MonitoringJobsItem.Enqueued:
        return <MonitoringEnqueuedList />;

      case MonitoringJobsItem.Deleted:
        return <MonitoringDeletedList />;

      case MonitoringJobsItem.Failed:
        return <MonitoringFailedList />;
        
      case MonitoringJobsItem.Fetched:
        return <MonitoringFetchedList />;

      case MonitoringJobsItem.Processing:
        return <MonitoringProcessingList />;

      case MonitoringJobsItem.Scheduled:
        return <MonitoringScheduledList />;

      case MonitoringJobsItem.Queues:
        return <MonitoringQueuesList />;
        
      default:
        break;
    }

    return (    
      <Card square>
        <CardContent>
          <Typography variant="h6" align="center" >
            Please select one job
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const render = (
  <React.Fragment>
    {
      isLoading ?
      <LoadingCircular />
      :
      <WebJobMonitoringTab
        tab={MonitoringTabs.Monitoring}      
      >
        <Grid container spacing={16}>
          <Grid item xs={12} md={3} lg={3}>
            {
              response &&
              response.data &&
              <MonitoringJobsItemTabs data={response.data} />
            }
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            {
              handlerList()
            }
          </Grid>
        </Grid>
      </WebJobMonitoringTab>
    }
  </React.Fragment>
  );

  return render;
};