import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
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
  IWebJobMonitoringStatisticGetAllRequest
} from '@webjob/classes/queries';
import { 
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
} from '@webjob/classes/response';
import { action } from 'typesafe-actions';

export const enum WebJobMonitoringAction {
  STATISTIC_GET_ALL_REQUEST = '@@webjob/monitoring/STATISTIC_GET_ALL_REQUEST',
  STATISTIC_GET_ALL_SUCCESS = '@@webjob/monitoring/STATISTIC_GET_ALL_SUCCESS',
  STATISTIC_GET_ALL_ERROR = '@@webjob/monitoring/STATISTIC_GET_ALL_ERROR',
  STATISTIC_GET_ALL_DISPOSE = '@@webjob/monitoring/STATISTIC_GET_ALL_DISPOSE',

  COUNT_GET_ALL_REQUEST = '@@webjob/monitoring/COUNT_GET_ALL_REQUEST',
  COUNT_GET_ALL_SUCCESS = '@@webjob/monitoring/COUNT_GET_ALL_SUCCESS',
  COUNT_GET_ALL_ERROR = '@@webjob/monitoring/COUNT_GET_ALL_ERROR',
  COUNT_GET_ALL_DISPOSE = '@@webjob/monitoring/COUNT_GET_ALL_DISPOSE',

  RECURRING_GET_ALL_REQUEST = '@@webjob/monitoring/RECURRING_GET_ALL_REQUEST',
  RECURRING_GET_ALL_SUCCESS = '@@webjob/monitoring/RECURRING_GET_ALL_SUCCESS',
  RECURRING_GET_ALL_ERROR = '@@webjob/monitoring/RECURRING_GET_ALL_ERROR',
  RECURRING_GET_ALL_DISPOSE = '@@webjob/monitoring/RECURRING_GET_ALL_DISPOSE',

  SERVER_GET_ALL_REQUEST = '@@webjob/monitoring/SERVER_GET_ALL_REQUEST',
  SERVER_GET_ALL_SUCCESS = '@@webjob/monitoring/SERVER_GET_ALL_SUCCESS',
  SERVER_GET_ALL_ERROR = '@@webjob/monitoring/SERVER_GET_ALL_ERROR',
  SERVER_GET_ALL_DISPOSE = '@@webjob/monitoring/SERVER_GET_ALL_DISPOSE',

  QUEUE_GET_ALL_REQUEST = '@@webjob/monitoring/QUEUE_GET_ALL_REQUEST',
  QUEUE_GET_ALL_SUCCESS = '@@webjob/monitoring/QUEUE_GET_ALL_SUCCESS',
  QUEUE_GET_ALL_ERROR = '@@webjob/monitoring/QUEUE_GET_ALL_ERROR',
  QUEUE_GET_ALL_DISPOSE = '@@webjob/monitoring/QUEUE_GET_ALL_DISPOSE',

  JOB_DELETED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_DELETED_GET_ALL_REQUEST',
  JOB_DELETED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_DELETED_GET_ALL_SUCCESS',
  JOB_DELETED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_DELETED_GET_ALL_ERROR',
  JOB_DELETED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_DELETED_GET_ALL_DISPOSE',

  JOB_ENQUEUED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_ENQUEUED_GET_ALL_REQUEST',
  JOB_ENQUEUED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_ENQUEUED_GET_ALL_SUCCESS',
  JOB_ENQUEUED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_ENQUEUED_GET_ALL_ERROR',
  JOB_ENQUEUED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_ENQUEUED_GET_ALL_DISPOSE',

  JOB_FAILED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_FAILED_GET_ALL_REQUEST',
  JOB_FAILED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_FAILED_GET_ALL_SUCCESS',
  JOB_FAILED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_FAILED_GET_ALL_ERROR',
  JOB_FAILED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_FAILED_GET_ALL_DISPOSE',

  JOB_FETCHED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_FETCHED_GET_ALL_REQUEST',
  JOB_FETCHED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_FETCHED_GET_ALL_SUCCESS',
  JOB_FETCHED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_FETCHED_GET_ALL_ERROR',
  JOB_FETCHED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_FETCHED_GET_ALL_DISPOSE',

  JOB_PROCESSING_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_PROCESSING_GET_ALL_REQUEST',
  JOB_PROCESSING_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_PROCESSING_GET_ALL_SUCCESS',
  JOB_PROCESSING_GET_ALL_ERROR = '@@webjob/monitoring/JOB_PROCESSING_GET_ALL_ERROR',
  JOB_PROCESSING_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_PROCESSING_GET_ALL_DISPOSE',

  JOB_SUCCEEDED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_SUCCEEDED_GET_ALL_REQUEST',
  JOB_SUCCEEDED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_SUCCEEDED_GET_ALL_SUCCESS',
  JOB_SUCCEEDED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_SUCCEEDED_GET_ALL_ERROR',
  JOB_SUCCEEDED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_SUCCEEDED_GET_ALL_DISPOSE',

  JOB_SCHEDULED_GET_ALL_REQUEST = '@@webjob/monitoring/JOB_SCHEDULED_GET_ALL_REQUEST',
  JOB_SCHEDULED_GET_ALL_SUCCESS = '@@webjob/monitoring/JOB_SCHEDULED_GET_ALL_SUCCESS',
  JOB_SCHEDULED_GET_ALL_ERROR = '@@webjob/monitoring/JOB_SCHEDULED_GET_ALL_ERROR',
  JOB_SCHEDULED_GET_ALL_DISPOSE = '@@webjob/monitoring/JOB_SCHEDULED_GET_ALL_DISPOSE',

  JOB_GET_BY_ID_REQUEST = '@@webjob/monitoring/JOB_GET_BY_ID_REQUEST',
  JOB_GET_BY_ID_SUCCESS = '@@webjob/monitoring/JOB_GET_BY_ID_SUCCESS',
  JOB_GET_BY_ID_ERROR = '@@webjob/monitoring/JOB_GET_BY_ID_ERROR',
  JOB_GET_BY_ID_DISPOSE = '@@webjob/monitoring/JOB_GET_BY_ID_DISPOSE',
}

// get all statistic
export const webJobMonitoringStatisticGetAllRequest = (request: IWebJobMonitoringStatisticGetAllRequest) => action(WebJobMonitoringAction.STATISTIC_GET_ALL_REQUEST, request);
export const webJobMonitoringStatisticGetAllSuccess = (response: IResponseSingle<IWebJobMonitoringStatistic>) => action(WebJobMonitoringAction.STATISTIC_GET_ALL_SUCCESS, response);
export const webJobMonitoringStatisticGetAllError = (error: any) => action(WebJobMonitoringAction.STATISTIC_GET_ALL_ERROR, error);
export const webJobMonitoringStatisticGetAllDispose = () => action(WebJobMonitoringAction.STATISTIC_GET_ALL_DISPOSE);

// get all count
export const webJobMonitoringCountGetAllRequest = (request: IWebJobMonitoringCountGetAllRequest) => action(WebJobMonitoringAction.COUNT_GET_ALL_REQUEST, request);
export const webJobMonitoringCountGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringCount>) => action(WebJobMonitoringAction.COUNT_GET_ALL_SUCCESS, response);
export const webJobMonitoringCountGetAllError = (error: any) => action(WebJobMonitoringAction.COUNT_GET_ALL_ERROR, error);
export const webJobMonitoringCountGetAllDispose = () => action(WebJobMonitoringAction.COUNT_GET_ALL_DISPOSE);

// get all recurring
export const webJobMonitoringRecurringGetAllRequest = (request: IWebJobMonitoringRecurringGetAllRequest) => action(WebJobMonitoringAction.RECURRING_GET_ALL_REQUEST, request);
export const webJobMonitoringRecurringGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringRecurring>) => action(WebJobMonitoringAction.RECURRING_GET_ALL_SUCCESS, response);
export const webJobMonitoringRecurringGetAllError = (error: any) => action(WebJobMonitoringAction.RECURRING_GET_ALL_ERROR, error);
export const webJobMonitoringRecurringGetAllDispose = () => action(WebJobMonitoringAction.RECURRING_GET_ALL_DISPOSE);

// get all server
export const webJobMonitoringServerGetAllRequest = (request: IWebJobMonitoringServerGetAllRequest) => action(WebJobMonitoringAction.SERVER_GET_ALL_REQUEST, request);
export const webJobMonitoringServerGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringServer>) => action(WebJobMonitoringAction.SERVER_GET_ALL_SUCCESS, response);
export const webJobMonitoringServerGetAllError = (error: any) => action(WebJobMonitoringAction.SERVER_GET_ALL_ERROR, error);
export const webJobMonitoringServerGetAllDispose = () => action(WebJobMonitoringAction.SERVER_GET_ALL_DISPOSE);

// get all queue
export const webJobMonitoringQueueGetAllRequest = (request: IWebJobMonitoringQueueGetAllRequest) => action(WebJobMonitoringAction.QUEUE_GET_ALL_REQUEST, request);
export const webJobMonitoringQueueGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringQueue>) => action(WebJobMonitoringAction.QUEUE_GET_ALL_SUCCESS, response);
export const webJobMonitoringQueueGetAllError = (error: any) => action(WebJobMonitoringAction.QUEUE_GET_ALL_ERROR, error);
export const webJobMonitoringQueueGetAllDispose = () => action(WebJobMonitoringAction.QUEUE_GET_ALL_DISPOSE);

// get all job deleted
export const webJobMonitoringJobDeletedGetAllRequest = (request: IWebJobMonitoringJobDeletedGetAllRequest) => action(WebJobMonitoringAction.JOB_DELETED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobDeletedGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobDeleted>) => action(WebJobMonitoringAction.JOB_DELETED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobDeletedGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_DELETED_GET_ALL_ERROR, error);
export const webJobMonitoringJobDeletedGetAllDispose = () => action(WebJobMonitoringAction.JOB_DELETED_GET_ALL_DISPOSE);

// get all job enqueued
export const webJobMonitoringJobEnqueuedGetAllRequest = (request: IWebJobMonitoringJobEnqueuedGetAllRequest) => action(WebJobMonitoringAction.JOB_ENQUEUED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobEnqueuedGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobEnqueued>) => action(WebJobMonitoringAction.JOB_ENQUEUED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobEnqueuedGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_ENQUEUED_GET_ALL_ERROR, error);
export const webJobMonitoringJobEnqueuedGetAllDispose = () => action(WebJobMonitoringAction.JOB_ENQUEUED_GET_ALL_DISPOSE);

// get all job failed
export const webJobMonitoringJobFailedGetAllRequest = (request: IWebJobMonitoringJobFailedGetAllRequest) => action(WebJobMonitoringAction.JOB_FAILED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobFailedGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobFailed>) => action(WebJobMonitoringAction.JOB_FAILED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobFailedGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_FAILED_GET_ALL_ERROR, error);
export const webJobMonitoringJobFailedGetAllDispose = () => action(WebJobMonitoringAction.JOB_FAILED_GET_ALL_DISPOSE);

// get all job fetched
export const webJobMonitoringJobFetchedGetAllRequest = (request: IWebJobMonitoringJobFetchedGetAllRequest) => action(WebJobMonitoringAction.JOB_FETCHED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobFetchedGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobFetched>) => action(WebJobMonitoringAction.JOB_FETCHED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobFetchedGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_FETCHED_GET_ALL_ERROR, error);
export const webJobMonitoringJobFetchedGetAllDispose = () => action(WebJobMonitoringAction.JOB_FETCHED_GET_ALL_DISPOSE);

// get all job processing
export const webJobMonitoringJobProcessingGetAllRequest = (request: IWebJobMonitoringJobProcessingGetAllRequest) => action(WebJobMonitoringAction.JOB_PROCESSING_GET_ALL_REQUEST, request);
export const webJobMonitoringJobProcessingGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobProcessing>) => action(WebJobMonitoringAction.JOB_PROCESSING_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobProcessingGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_PROCESSING_GET_ALL_ERROR, error);
export const webJobMonitoringJobProcessingGetAllDispose = () => action(WebJobMonitoringAction.JOB_PROCESSING_GET_ALL_DISPOSE);

// get all job succeeded
export const webJobMonitoringJobSucceededGetAllRequest = (request: IWebJobMonitoringJobSucceededGetAllRequest) => action(WebJobMonitoringAction.JOB_SUCCEEDED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobSucceededGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobSucceeded>) => action(WebJobMonitoringAction.JOB_SUCCEEDED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobSucceededGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_SUCCEEDED_GET_ALL_ERROR, error);
export const webJobMonitoringJobSucceededGetAllDispose = () => action(WebJobMonitoringAction.JOB_SUCCEEDED_GET_ALL_DISPOSE);

// get all job scheduled
export const webJobMonitoringJobScheduledGetAllRequest = (request: IWebJobMonitoringJobScheduledGetAllRequest) => action(WebJobMonitoringAction.JOB_SCHEDULED_GET_ALL_REQUEST, request);
export const webJobMonitoringJobScheduledGetAllSuccess = (response: IResponseCollection<IWebJobMonitoringJobScheduled>) => action(WebJobMonitoringAction.JOB_SCHEDULED_GET_ALL_SUCCESS, response);
export const webJobMonitoringJobScheduledGetAllError = (error: any) => action(WebJobMonitoringAction.JOB_SCHEDULED_GET_ALL_ERROR, error);
export const webJobMonitoringJobScheduledGetAllDispose = () => action(WebJobMonitoringAction.JOB_SCHEDULED_GET_ALL_DISPOSE);

// get job by id
export const webJobMonitoringJobGetDetailGetByIdRequest = (request: IWebJobMonitoringJobGetDetailRequest) => action(WebJobMonitoringAction.JOB_GET_BY_ID_REQUEST, request);
export const webJobMonitoringJobGetDetailGetByIdSuccess = (response: IResponseSingle<IWebJobMonitoringJobDetail>) => action(WebJobMonitoringAction.JOB_GET_BY_ID_SUCCESS, response);
export const webJobMonitoringJobGetDetailGetByIdError = (error: any) => action(WebJobMonitoringAction.JOB_GET_BY_ID_ERROR, error);
export const webJobMonitoringJobGetDetailGetByIdDispose = () => action(WebJobMonitoringAction.JOB_GET_BY_ID_DISPOSE);