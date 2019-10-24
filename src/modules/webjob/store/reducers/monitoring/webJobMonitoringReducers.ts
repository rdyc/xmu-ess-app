import { webJobMonitoringCountGetAllReducer } from './webJobMonitoringCountGetAllReducer';
import { webJobMonitoringJobDeletedGetAllReducer } from './webJobMonitoringJobDeletedGetAllReducer';
import { webJobMonitoringJobEnqueuedGetAllReducer } from './webJobMonitoringJobEnqueuedGetAllReducer';
import { webJobMonitoringJobFailedGetAllReducer } from './webJobMonitoringJobFailedGetAllReducer';
import { webJobMonitoringJobFetchedGetAllReducer } from './webJobMonitoringJobFetchedGetAllReducer';
import { webJobMonitoringJobGetDetailReducer } from './webJobMonitoringJobGetDetailReducer';
import { webJobMonitoringJobProcessingGetAllReducer } from './webJobMonitoringJobProcessingGetAllReducer';
import { webJobMonitoringJobScheduledGetAllReducer } from './webJobMonitoringJobScheduledGetAllReducer';
import { webJobMonitoringJobSucceededGetAllReducer } from './webJobMonitoringJobSucceededGetAllReducer';
import { webJobMonitoringQueueGetAllReducer } from './webJobMonitoringQueueGetAllReducer';
import { webJobMonitoringRecurringGetAllReducer } from './webJobMonitoringRecurringGetAllReducer';
import { webJobMonitoringServerGetAllReducer } from './webJobMonitoringServerGetAllReducer';
import { webJobMonitoringStatisticGetAllReducer } from './webJobMonitoringStatisticGetAllReducer';

export const webJobMonitoringReducers = {
  webJobMonitoringStatisticGetAll: webJobMonitoringStatisticGetAllReducer,
  webJobMonitoringCountGetAll: webJobMonitoringCountGetAllReducer,
  webJobMonitoringRecurringGetAll: webJobMonitoringRecurringGetAllReducer,
  webJobMonitoringServerGetAll: webJobMonitoringServerGetAllReducer,
  webJobMonitoringQueueGetAll: webJobMonitoringQueueGetAllReducer,
  webJobMonitoringJobDeletedGetAll: webJobMonitoringJobDeletedGetAllReducer,
  webJobMonitoringJobEnqueuedGetAll: webJobMonitoringJobEnqueuedGetAllReducer,
  webJobMonitoringJobFailedGetAll: webJobMonitoringJobFailedGetAllReducer,
  webJobMonitoringJobFetchedGetAll: webJobMonitoringJobFetchedGetAllReducer,
  webJobMonitoringJobProcessingGetAll: webJobMonitoringJobProcessingGetAllReducer,
  webJobMonitoringJobSucceededGetAll: webJobMonitoringJobSucceededGetAllReducer,
  webJobMonitoringJobScheduledGetAll: webJobMonitoringJobScheduledGetAllReducer,
  webJobMonitoringJobGetDetail: webJobMonitoringJobGetDetailReducer,
};