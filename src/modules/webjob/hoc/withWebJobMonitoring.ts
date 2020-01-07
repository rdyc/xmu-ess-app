import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IWebJobMonitoringCountGetAllRequest, IWebJobMonitoringJobDeletedGetAllRequest, 
  IWebJobMonitoringJobEnqueuedGetAllRequest, IWebJobMonitoringJobFailedGetAllRequest, 
  IWebJobMonitoringJobFetchedGetAllRequest, IWebJobMonitoringJobGetDetailRequest, 
  IWebJobMonitoringJobProcessingGetAllRequest, IWebJobMonitoringJobScheduledGetAllRequest, 
  IWebJobMonitoringJobSucceededGetAllRequest, IWebJobMonitoringQueueGetAllRequest, 
  IWebJobMonitoringRecurringGetAllRequest, IWebJobMonitoringServerGetAllRequest, 
  IWebJobMonitoringStatisticGetAllRequest 
} from '@webjob/classes/queries';
import { 
  IWebJobMonitoringCount, IWebJobMonitoringJobDeleted, 
  IWebJobMonitoringJobDetail, IWebJobMonitoringJobEnqueued, 
  IWebJobMonitoringJobFailed, IWebJobMonitoringJobFetched, 
  IWebJobMonitoringJobProcessing, IWebJobMonitoringJobScheduled, 
  IWebJobMonitoringJobSucceeded, IWebJobMonitoringQueue, 
  IWebJobMonitoringRecurring, IWebJobMonitoringServer, 
  IWebJobMonitoringStatistic 
} from '@webjob/classes/response';
import { 
  webJobMonitoringCountGetAllDispose, webJobMonitoringCountGetAllRequest, 
  webJobMonitoringJobDeletedGetAllDispose, webJobMonitoringJobDeletedGetAllRequest, 
  webJobMonitoringJobEnqueuedGetAllDispose, webJobMonitoringJobEnqueuedGetAllRequest, 
  webJobMonitoringJobFailedGetAllDispose, webJobMonitoringJobFailedGetAllRequest, 
  webJobMonitoringJobFetchedGetAllDispose, webJobMonitoringJobFetchedGetAllRequest, 
  webJobMonitoringJobGetDetailGetByIdDispose, webJobMonitoringJobGetDetailGetByIdRequest, 
  webJobMonitoringJobProcessingGetAllDispose, webJobMonitoringJobProcessingGetAllRequest, 
  webJobMonitoringJobScheduledGetAllDispose, webJobMonitoringJobScheduledGetAllRequest, 
  webJobMonitoringJobSucceededGetAllDispose, webJobMonitoringJobSucceededGetAllRequest, 
  webJobMonitoringQueueGetAllDispose, webJobMonitoringQueueGetAllRequest, 
  webJobMonitoringRecurringGetAllDispose, webJobMonitoringRecurringGetAllRequest,
   webJobMonitoringServerGetAllDispose, webJobMonitoringServerGetAllRequest, 
   webJobMonitoringStatisticGetAllDispose, webJobMonitoringStatisticGetAllRequest 
} from '@webjob/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  webJobMonitoringState: {
    statisticAll: IQuerySingleState<IWebJobMonitoringStatisticGetAllRequest, IWebJobMonitoringStatistic>;
    countAll: IQueryCollectionState<IWebJobMonitoringCountGetAllRequest, IWebJobMonitoringCount>;
    recurringAll: IQueryCollectionState<IWebJobMonitoringRecurringGetAllRequest, IWebJobMonitoringRecurring>;
    serverAll: IQueryCollectionState<IWebJobMonitoringServerGetAllRequest, IWebJobMonitoringServer>;
    queueAll: IQueryCollectionState<IWebJobMonitoringQueueGetAllRequest, IWebJobMonitoringQueue>;
    jobDeletedAll: IQueryCollectionState<IWebJobMonitoringJobDeletedGetAllRequest, IWebJobMonitoringJobDeleted>;
    jobEnqueuedAll: IQueryCollectionState<IWebJobMonitoringJobEnqueuedGetAllRequest, IWebJobMonitoringJobEnqueued>;
    jobFailedAll: IQueryCollectionState<IWebJobMonitoringJobFailedGetAllRequest, IWebJobMonitoringJobFailed>;
    jobFetchedAll: IQueryCollectionState<IWebJobMonitoringJobFetchedGetAllRequest, IWebJobMonitoringJobFetched>;
    jobProcessingAll: IQueryCollectionState<IWebJobMonitoringJobProcessingGetAllRequest, IWebJobMonitoringJobProcessing>;
    jobSucceededAll: IQueryCollectionState<IWebJobMonitoringJobSucceededGetAllRequest, IWebJobMonitoringJobSucceeded>;
    jobScheduledAll: IQueryCollectionState<IWebJobMonitoringJobScheduledGetAllRequest, IWebJobMonitoringJobScheduled>;
    jobDetail: IQuerySingleState<IWebJobMonitoringJobGetDetailRequest, IWebJobMonitoringJobDetail>;
  };
}

interface PropsFromDispatch {
  webJobMonitoringDispatch: {
    // query
    loadAllStatisticRequest: typeof webJobMonitoringStatisticGetAllRequest;
    loadAllStatisticDispose: typeof webJobMonitoringStatisticGetAllDispose;
    loadAllCountRequest: typeof webJobMonitoringCountGetAllRequest;
    loadAllCountDispose: typeof webJobMonitoringCountGetAllDispose;
    loadAllRecurringRequest: typeof webJobMonitoringRecurringGetAllRequest;
    loadAllRecurringDispose: typeof webJobMonitoringRecurringGetAllDispose;
    loadAllServerRequest: typeof webJobMonitoringServerGetAllRequest;
    loadAllServerDispose: typeof webJobMonitoringServerGetAllDispose;
    loadAllQueueRequest: typeof webJobMonitoringQueueGetAllRequest;
    loadAllQueueDispose: typeof webJobMonitoringQueueGetAllDispose;
    loadAllJobDeletedRequest: typeof webJobMonitoringJobDeletedGetAllRequest;
    loadAllJobDeletedDispose: typeof webJobMonitoringJobDeletedGetAllDispose;
    loadAllJobEnqueuedRequest: typeof webJobMonitoringJobEnqueuedGetAllRequest;
    loadAllJobEnqueuedDispose: typeof webJobMonitoringJobEnqueuedGetAllDispose;
    loadAllJobFailedRequest: typeof webJobMonitoringJobFailedGetAllRequest;
    loadAllJobFailedDispose: typeof webJobMonitoringJobFailedGetAllDispose;
    loadAllJobFetchedRequest: typeof webJobMonitoringJobFetchedGetAllRequest;
    loadAllJobFetchedDispose: typeof webJobMonitoringJobFetchedGetAllDispose;
    loadAllJobProcessingRequest: typeof webJobMonitoringJobProcessingGetAllRequest;
    loadAllJobProcessingDispose: typeof webJobMonitoringJobProcessingGetAllDispose;
    loadAllJobSucceededRequest: typeof webJobMonitoringJobSucceededGetAllRequest;
    loadAllJobSucceededDispose: typeof webJobMonitoringJobSucceededGetAllDispose;
    loadAllJobScheduledRequest: typeof webJobMonitoringJobScheduledGetAllRequest;
    loadAllJobScheduledDispose: typeof webJobMonitoringJobScheduledGetAllDispose;
    loadDetailJobRequest: typeof webJobMonitoringJobGetDetailGetByIdRequest;
    loadDetailJobDispose: typeof webJobMonitoringJobGetDetailGetByIdDispose;
  };
}

export interface WithWebJobMonitoring extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  webJobMonitoringStatisticGetAll, webJobMonitoringCountGetAll, webJobMonitoringRecurringGetAll, webJobMonitoringServerGetAll,  
  webJobMonitoringQueueGetAll, webJobMonitoringJobDeletedGetAll, webJobMonitoringJobEnqueuedGetAll, webJobMonitoringJobFailedGetAll, 
  webJobMonitoringJobFetchedGetAll, webJobMonitoringJobProcessingGetAll, webJobMonitoringJobSucceededGetAll, 
  webJobMonitoringJobScheduledGetAll, webJobMonitoringJobGetDetail }: IAppState) => ({

  webJobMonitoringState: {
    statisticAll: webJobMonitoringStatisticGetAll,
    countAll: webJobMonitoringCountGetAll,
    recurringAll: webJobMonitoringRecurringGetAll,
    serverAll: webJobMonitoringServerGetAll,
    queueAll: webJobMonitoringQueueGetAll,
    jobDeletedAll: webJobMonitoringJobDeletedGetAll,
    jobEnqueuedAll: webJobMonitoringJobEnqueuedGetAll,
    jobFailedAll: webJobMonitoringJobFailedGetAll,
    jobFetchedAll: webJobMonitoringJobFetchedGetAll,
    jobProcessingAll: webJobMonitoringJobProcessingGetAll,
    jobSucceededAll: webJobMonitoringJobSucceededGetAll,
    jobScheduledAll: webJobMonitoringJobScheduledGetAll,
    jobDetail: webJobMonitoringJobGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  webJobMonitoringDispatch: {
    // query
    loadAllStatisticRequest: (request: IWebJobMonitoringStatisticGetAllRequest) => dispatch(webJobMonitoringStatisticGetAllRequest(request)),
    loadAllStatisticDispose: () => dispatch(webJobMonitoringStatisticGetAllDispose()),
    loadAllCountRequest: (request: IWebJobMonitoringCountGetAllRequest) => dispatch(webJobMonitoringCountGetAllRequest(request)),
    loadAllCountDispose: () => dispatch(webJobMonitoringCountGetAllDispose()),
    loadAllRecurringRequest: (request: IWebJobMonitoringRecurringGetAllRequest) => dispatch(webJobMonitoringRecurringGetAllRequest(request)),
    loadAllRecurringDispose: () => dispatch(webJobMonitoringRecurringGetAllDispose()),
    loadAllServerRequest: (request: IWebJobMonitoringServerGetAllRequest) => dispatch(webJobMonitoringServerGetAllRequest(request)),
    loadAllServerDispose: () => dispatch(webJobMonitoringServerGetAllDispose()),
    loadAllQueueRequest: (request: IWebJobMonitoringQueueGetAllRequest) => dispatch(webJobMonitoringQueueGetAllRequest(request)),
    loadAllQueueDispose: () => dispatch(webJobMonitoringQueueGetAllDispose()),
    loadAllJobDeletedRequest: (request: IWebJobMonitoringJobDeletedGetAllRequest) => dispatch(webJobMonitoringJobDeletedGetAllRequest(request)),
    loadAllJobDeletedDispose: () => dispatch(webJobMonitoringJobDeletedGetAllDispose()),
    loadAllJobEnqueuedRequest: (request: IWebJobMonitoringJobEnqueuedGetAllRequest) => dispatch(webJobMonitoringJobEnqueuedGetAllRequest(request)),
    loadAllJobEnqueuedDispose: () => dispatch(webJobMonitoringJobEnqueuedGetAllDispose()),
    loadAllJobFailedRequest: (request: IWebJobMonitoringJobFailedGetAllRequest) => dispatch(webJobMonitoringJobFailedGetAllRequest(request)),
    loadAllJobFailedDispose: () => dispatch(webJobMonitoringJobFailedGetAllDispose()),
    loadAllJobFetchedRequest: (request: IWebJobMonitoringJobFetchedGetAllRequest) => dispatch(webJobMonitoringJobFetchedGetAllRequest(request)),
    loadAllJobFetchedDispose: () => dispatch(webJobMonitoringJobFetchedGetAllDispose()),
    loadAllJobProcessingRequest: (request: IWebJobMonitoringJobProcessingGetAllRequest) => dispatch(webJobMonitoringJobProcessingGetAllRequest(request)),
    loadAllJobProcessingDispose: () => dispatch(webJobMonitoringJobProcessingGetAllDispose()),
    loadAllJobSucceededRequest: (request: IWebJobMonitoringJobSucceededGetAllRequest) => dispatch(webJobMonitoringJobSucceededGetAllRequest(request)),
    loadAllJobSucceededDispose: () => dispatch(webJobMonitoringJobSucceededGetAllDispose()),
    loadAllJobScheduledRequest: (request: IWebJobMonitoringJobScheduledGetAllRequest) => dispatch(webJobMonitoringJobScheduledGetAllRequest(request)),
    loadAllJobScheduledDispose: () => dispatch(webJobMonitoringJobScheduledGetAllDispose()),
    loadDetailJobRequest: (request: IWebJobMonitoringJobGetDetailRequest) => dispatch(webJobMonitoringJobGetDetailGetByIdRequest(request)),
    loadDetailJobDispose: () => dispatch(webJobMonitoringJobGetDetailGetByIdDispose()),
  }
});

export const withWebJobMonitoring = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);