import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IWebJobDefinitionDeleteRequest, 
  IWebJobDefinitionGetAllRequest, 
  IWebJobDefinitionGetDetailRequest,
  IWebJobDefinitionGetListRequest,
  IWebJobDefinitionJobGetAllRequest,
  IWebJobDefinitionJobGetListRequest,
  IWebJobDefinitionPostRequest,
  IWebJobMonitoringCountGetAllRequest,
  IWebJobMonitoringJobDeletedGetAllRequest,
  IWebJobMonitoringJobEnqueuedGetAllRequest,
  IWebJobMonitoringJobFailedGetAllRequest,
  IWebJobMonitoringJobFetchedGetAllRequest,
  IWebJobMonitoringJobGetDetailRequest,
  IWebJobMonitoringJobProcessingGetAllRequest,
  IWebJobMonitoringJobScheduledGetAllRequest,
  IWebJobMonitoringJobSucceededGetAllRequest,
  IWebJobMonitoringQueueGetAllRequest,
  IWebJobMonitoringRecurringGetAllRequest,
  IWebJobMonitoringServerGetAllRequest,
  IWebJobMonitoringStatisticGetAllRequest,
  IWebJobRecurringDeleteRequest,
  IWebJobRecurringGetAllRequest,
  IWebJobRecurringGetDetailRequest,
  IWebJobRecurringPostRequest,
  IWebJobRecurringPutRequest,
  IWebJobRecurringTriggerRequest
} from '../queries';
import { 
  IWebJobDefinition, 
  IWebJobDefinitionDetail, 
  IWebJobDefinitionJob,
  IWebJobDefinitionJobList,
  IWebJobDefinitionList,
  IWebJobMonitoringCount,
  IWebJobMonitoringJobDeleted,
  IWebJobMonitoringJobDetail,
  IWebJobMonitoringJobEnqueued,
  IWebJobMonitoringJobFailed,
  IWebJobMonitoringJobFetched,
  IWebJobMonitoringJobProcessing,
  IWebJobMonitoringJobScheduled,
  IWebJobMonitoringJobSucceeded,
  IWebJobMonitoringQueue,
  IWebJobMonitoringRecurring,
  IWebJobMonitoringServer,
  IWebJobMonitoringStatistic,
  IWebJobRecurring,
  IWebJobRecurringDetail
} from '../response';

export interface IWebJobState {
  // definition
  webJobDefinitionDelete: IQuerySingleState<IWebJobDefinitionDeleteRequest, boolean>;
  webJobDefinitionPost: IQuerySingleState<IWebJobDefinitionPostRequest, IWebJobDefinition>;
  webJobDefinitionGetDetail: IQuerySingleState<IWebJobDefinitionGetDetailRequest, IWebJobDefinitionDetail>;
  webJobDefinitionGetAll: IQueryCollectionState<IWebJobDefinitionGetAllRequest, IWebJobDefinition>;
  webJobDefinitionGetList: IQueryCollectionState<IWebJobDefinitionGetListRequest, IWebJobDefinitionList>;
  webJobDefinitionJobGetAll: IQueryCollectionState<IWebJobDefinitionJobGetAllRequest, IWebJobDefinitionJob>;
  webJobDefinitionJobGetList: IQueryCollectionState<IWebJobDefinitionJobGetListRequest, IWebJobDefinitionJobList>;
  
  // recurring
  webJobRecurringDelete: IQuerySingleState<IWebJobRecurringDeleteRequest, boolean>;
  webJobRecurringPost: IQuerySingleState<IWebJobRecurringPostRequest, IWebJobRecurring>;
  webJobRecurringPut: IQuerySingleState<IWebJobRecurringPutRequest, IWebJobRecurring>;
  webJobRecurringTrigger: IQuerySingleState<IWebJobRecurringTriggerRequest, boolean>;
  webJobRecurringGetDetail: IQuerySingleState<IWebJobRecurringGetDetailRequest, IWebJobRecurringDetail>;
  webJobRecurringGetAll: IQueryCollectionState<IWebJobRecurringGetAllRequest, IWebJobRecurring>;

  // monitoring
  webJobMonitoringStatisticGetAll: IQuerySingleState<IWebJobMonitoringStatisticGetAllRequest, IWebJobMonitoringStatistic>;
  webJobMonitoringCountGetAll: IQueryCollectionState<IWebJobMonitoringCountGetAllRequest, IWebJobMonitoringCount>;
  webJobMonitoringRecurringGetAll: IQueryCollectionState<IWebJobMonitoringRecurringGetAllRequest, IWebJobMonitoringRecurring>;
  webJobMonitoringServerGetAll: IQueryCollectionState<IWebJobMonitoringServerGetAllRequest, IWebJobMonitoringServer>;
  webJobMonitoringQueueGetAll: IQueryCollectionState<IWebJobMonitoringQueueGetAllRequest, IWebJobMonitoringQueue>;
  webJobMonitoringJobDeletedGetAll: IQueryCollectionState<IWebJobMonitoringJobDeletedGetAllRequest, IWebJobMonitoringJobDeleted>;
  webJobMonitoringJobEnqueuedGetAll: IQueryCollectionState<IWebJobMonitoringJobEnqueuedGetAllRequest, IWebJobMonitoringJobEnqueued>;
  webJobMonitoringJobFailedGetAll: IQueryCollectionState<IWebJobMonitoringJobFailedGetAllRequest, IWebJobMonitoringJobFailed>;
  webJobMonitoringJobFetchedGetAll: IQueryCollectionState<IWebJobMonitoringJobFetchedGetAllRequest, IWebJobMonitoringJobFetched>;
  webJobMonitoringJobProcessingGetAll: IQueryCollectionState<IWebJobMonitoringJobProcessingGetAllRequest, IWebJobMonitoringJobProcessing>;
  webJobMonitoringJobSucceededGetAll: IQueryCollectionState<IWebJobMonitoringJobSucceededGetAllRequest, IWebJobMonitoringJobSucceeded>;
  webJobMonitoringJobScheduledGetAll: IQueryCollectionState<IWebJobMonitoringJobScheduledGetAllRequest, IWebJobMonitoringJobScheduled>;
  webJobMonitoringJobGetDetail: IQuerySingleState<IWebJobMonitoringJobGetDetailRequest, IWebJobMonitoringJobDetail>;
}