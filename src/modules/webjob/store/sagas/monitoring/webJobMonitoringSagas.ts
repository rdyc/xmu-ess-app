import { UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import {
  WebJobMonitoringAction as Action,
  webJobMonitoringCountGetAllDispose,
  webJobMonitoringCountGetAllError,
  webJobMonitoringCountGetAllRequest,
  webJobMonitoringCountGetAllSuccess,
  webJobMonitoringJobDeletedGetAllDispose,
  webJobMonitoringJobDeletedGetAllError,
  webJobMonitoringJobDeletedGetAllRequest,
  webJobMonitoringJobDeletedGetAllSuccess,
  webJobMonitoringJobEnqueuedGetAllDispose,
  webJobMonitoringJobEnqueuedGetAllError,
  webJobMonitoringJobEnqueuedGetAllRequest,
  webJobMonitoringJobEnqueuedGetAllSuccess,
  webJobMonitoringJobFailedGetAllDispose,
  webJobMonitoringJobFailedGetAllError,
  webJobMonitoringJobFailedGetAllRequest,
  webJobMonitoringJobFailedGetAllSuccess,
  webJobMonitoringJobFetchedGetAllDispose,
  webJobMonitoringJobFetchedGetAllError,
  webJobMonitoringJobFetchedGetAllRequest,
  webJobMonitoringJobFetchedGetAllSuccess,
  webJobMonitoringJobGetDetailGetByIdDispose,
  webJobMonitoringJobGetDetailGetByIdError,
  webJobMonitoringJobGetDetailGetByIdRequest,
  webJobMonitoringJobGetDetailGetByIdSuccess,
  webJobMonitoringJobProcessingGetAllDispose,
  webJobMonitoringJobProcessingGetAllError,
  webJobMonitoringJobProcessingGetAllRequest,
  webJobMonitoringJobProcessingGetAllSuccess,
  webJobMonitoringJobScheduledGetAllDispose,
  webJobMonitoringJobScheduledGetAllError,
  webJobMonitoringJobScheduledGetAllRequest,
  webJobMonitoringJobScheduledGetAllSuccess,
  webJobMonitoringJobSucceededGetAllDispose,
  webJobMonitoringJobSucceededGetAllError,
  webJobMonitoringJobSucceededGetAllRequest,
  webJobMonitoringJobSucceededGetAllSuccess,
  webJobMonitoringQueueGetAllDispose,
  webJobMonitoringQueueGetAllError,
  webJobMonitoringQueueGetAllRequest,
  webJobMonitoringQueueGetAllSuccess,
  webJobMonitoringRecurringGetAllDispose,
  webJobMonitoringRecurringGetAllError,
  webJobMonitoringRecurringGetAllRequest,
  webJobMonitoringRecurringGetAllSuccess,
  webJobMonitoringServerGetAllDispose,
  webJobMonitoringServerGetAllError,
  webJobMonitoringServerGetAllRequest,
  webJobMonitoringServerGetAllSuccess,
  webJobMonitoringStatisticGetAllDispose,
  webJobMonitoringStatisticGetAllError,
  webJobMonitoringStatisticGetAllRequest,
  webJobMonitoringStatisticGetAllSuccess,
} from '@webjob/store/actions';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllStatisticRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringStatisticGetAllRequest>) => {
    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/statistics`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringStatisticGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringStatisticGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringStatisticGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.STATISTIC_GET_ALL_REQUEST, worker);
}

function* watchFetchAllCountRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringCountGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/counts?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringCountGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringCountGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringCountGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.COUNT_GET_ALL_REQUEST, worker);
}

function* watchFetchAllRecurringRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringRecurringGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/recurrings?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringRecurringGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringRecurringGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringRecurringGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.RECURRING_GET_ALL_REQUEST, worker);
}

function* watchFetchAllServerRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringServerGetAllRequest>) => {
    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/servers`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringServerGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringServerGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringServerGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.SERVER_GET_ALL_REQUEST, worker);
}

function* watchFetchAllQueueRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringQueueGetAllRequest>) => {
    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/queues`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringQueueGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringQueueGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringQueueGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.QUEUE_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllDeletedRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobDeletedGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/deleted?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobDeletedGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobDeletedGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobDeletedGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_DELETED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllEnqueuedRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobEnqueuedGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/enqueued?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobEnqueuedGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobEnqueuedGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobEnqueuedGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_ENQUEUED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllFailedRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobFailedGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/failed?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobFailedGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobFailedGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobFailedGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_FAILED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllFetchedRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobFetchedGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/fetched?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobFetchedGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobFetchedGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobFetchedGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_FETCHED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllProcessingRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobProcessingGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/processing?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobProcessingGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobProcessingGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobProcessingGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_PROCESSING_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllSucceededRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobSucceededGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/succeeded?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobSucceededGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobSucceededGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobSucceededGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_SUCCEEDED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobAllScheduledRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobScheduledGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/scheduled?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobScheduledGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobScheduledGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobScheduledGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_SCHEDULED_GET_ALL_REQUEST, worker);
}

function* watchFetchJobByIdRequest() {
  const worker = (action: ReturnType<typeof webJobMonitoringJobGetDetailGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: 'http://10.0.20.150:5002',
      method: 'get',
      path: `/api/v1/monitoring/jobs/${action.payload.jobId}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobGetDetailGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobMonitoringJobGetDetailGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobMonitoringJobGetDetailGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.JOB_GET_BY_ID_ERROR, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(webJobMonitoringStatisticGetAllDispose()),
      put(webJobMonitoringCountGetAllDispose()),
      put(webJobMonitoringRecurringGetAllDispose()),
      put(webJobMonitoringServerGetAllDispose()),
      put(webJobMonitoringQueueGetAllDispose()),
      put(webJobMonitoringJobDeletedGetAllDispose()),
      put(webJobMonitoringJobEnqueuedGetAllDispose()),
      put(webJobMonitoringJobFailedGetAllDispose()),
      put(webJobMonitoringJobFetchedGetAllDispose()),
      put(webJobMonitoringJobProcessingGetAllDispose()),
      put(webJobMonitoringJobSucceededGetAllDispose()),
      put(webJobMonitoringJobScheduledGetAllDispose()),
      put(webJobMonitoringJobGetDetailGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* webJobMonitoringSagas() {
  yield all([
    fork(watchSwitchAccess),
    fork(watchFetchAllStatisticRequest),
    fork(watchFetchAllCountRequest),
    fork(watchFetchAllRecurringRequest),
    fork(watchFetchAllServerRequest),
    fork(watchFetchAllQueueRequest),
    fork(watchFetchJobAllDeletedRequest),
    fork(watchFetchJobAllEnqueuedRequest),
    fork(watchFetchJobAllFailedRequest),
    fork(watchFetchJobAllFetchedRequest),
    fork(watchFetchJobAllProcessingRequest),
    fork(watchFetchJobAllSucceededRequest),
    fork(watchFetchJobAllScheduledRequest),
    fork(watchFetchJobByIdRequest),
  ]);
}

export default webJobMonitoringSagas;