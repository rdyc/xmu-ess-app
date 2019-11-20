import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { 
  WebJobRecurringAction as Action,
  webJobRecurringDeleteError, webJobRecurringDeleteRequest, webJobRecurringDeleteSuccess, 
  webJobRecurringGetAllDispose, webJobRecurringGetAllError, webJobRecurringGetAllRequest,
  webJobRecurringGetAllSuccess, webJobRecurringGetByIdDispose, webJobRecurringGetByIdError, 
  webJobRecurringGetByIdRequest, webJobRecurringGetByIdSuccess, webJobRecurringPostError, 
  webJobRecurringPostRequest, webJobRecurringPostSuccess, webJobRecurringPutError,
  webJobRecurringPutRequest, webJobRecurringPutSuccess, webJobRecurringTriggerError, 
  webJobRecurringTriggerRequest, webJobRecurringTriggerSuccess,
} from '@webjob/store/actions';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'GET',
      path: `/api/v1/recurrings?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(webJobRecurringGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobRecurringGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobRecurringGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringGetByIdRequest>) => {
    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'GET',
      path: `/api/v1/recurrings/${action.payload.recurringUid}`,
      successEffects: (response: IApiResponse) => ([
        put(webJobRecurringGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(webJobRecurringGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(webJobRecurringGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringPostRequest>) => {
    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'POST',
      path: `/api/v1/recurrings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(webJobRecurringGetByIdDispose()),
        put(webJobRecurringGetAllDispose()),
        put(webJobRecurringPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobRecurringPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobRecurringPostError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringPutRequest>) => {
    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'PUT',
      path: `/api/v1/recurrings/${action.payload.recurringUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(webJobRecurringGetByIdDispose()),
        put(webJobRecurringGetAllDispose()),
        put(webJobRecurringPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobRecurringPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobRecurringPutError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringDeleteRequest>) => {
    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'DELETE',
      path: `/api/v1/recurrings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(webJobRecurringDeleteSuccess()),
        put(webJobRecurringGetByIdDispose()),
        put(webJobRecurringGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobRecurringDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobRecurringDeleteError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* watchTriggerRequest() {
  const worker = (action: ReturnType<typeof webJobRecurringTriggerRequest>) => {
    return saiyanSaga.fetch({
      host: process.env.REACT_APP_WEBJOB_API_URL,
      method: 'POST',
      path: `/api/v1/recurrings/trigger`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(webJobRecurringTriggerSuccess()),
        put(webJobRecurringGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(webJobRecurringTriggerError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(webJobRecurringTriggerError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.TRIGGER_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(webJobRecurringGetAllDispose()),
      put(webJobRecurringGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* webJobRecurringSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchTriggerRequest),
    fork(watchSwitchAccess)
  ]);
}

export default webJobRecurringSagas;