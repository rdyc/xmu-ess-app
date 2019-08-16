import {
  PeriodAction as Action,
  periodDeleteError,
  periodDeleteRequest,
  periodDeleteSuccess,
  periodGetAllDispose,
  periodGetAllError,
  periodGetAllRequest,
  periodGetAllSuccess,
  periodGetByIdDispose,
  periodGetByIdError,
  periodGetByIdRequest,
  periodGetByIdSuccess,
  periodPostError,
  periodPostRequest,
  periodPostSuccess,
  periodPutError,
  periodPutRequest,
  periodPutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof periodGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/periods?${params}`,
      successEffects: (response: IApiResponse) => [
        put(periodGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(periodGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(periodGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof periodGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/periods/${action.payload.periodUid}`,
      successEffects: (response: IApiResponse) => [
        put(periodGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(periodGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(periodGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof periodPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/notification/periods`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(periodGetByIdDispose()),
        put(periodGetAllDispose()),
        put(periodPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(periodPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(periodPostError(error.message)),
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
  const worker = (action: ReturnType<typeof periodPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/notification/periods/${action.payload.periodUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(periodGetByIdDispose()),
        put(periodGetAllDispose()),
        put(periodPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(periodPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(periodPutError(error.message)),
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
  const worker = (action: ReturnType<typeof periodDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/notification/periods`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(periodGetByIdDispose()),
        put(periodGetAllDispose()),
        put(periodDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(periodDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(periodDeleteError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(periodGetAllDispose()),
      put(periodGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* periodSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default periodSagas;