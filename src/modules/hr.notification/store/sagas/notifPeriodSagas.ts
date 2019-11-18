import {
  NotifPeriodAction as Action,
  notifPeriodDeleteError,
  notifPeriodDeleteRequest,
  notifPeriodGetAllDispose,
  notifPeriodGetAllError,
  notifPeriodGetAllRequest,
  notifPeriodGetAllSuccess,
  notifPeriodGetByIdDispose,
  notifPeriodGetByIdError,
  notifPeriodGetByIdRequest,
  notifPeriodGetByIdSuccess,
  notifPeriodPostError,
  notifPeriodPostRequest,
  notifPeriodPostSuccess,
  notifPeriodPutError,
  notifPeriodPutRequest,
  notifPeriodPutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof notifPeriodGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/notification/periods?${params}`,
      successEffects: (response: IApiResponse) => [
        put(notifPeriodGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifPeriodGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifPeriodGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof notifPeriodGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/notification/periods/${action.payload.periodUid}`,
      successEffects: (response: IApiResponse) => [
        put(notifPeriodGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifPeriodGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifPeriodGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof notifPeriodPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/hr/notification/periods`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifPeriodGetByIdDispose()),
        put(notifPeriodGetAllDispose()),
        put(notifPeriodPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifPeriodPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifPeriodPostError(error.message)),
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
  const worker = (action: ReturnType<typeof notifPeriodPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/hr/notification/periods/${action.payload.periodUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifPeriodGetByIdDispose()),
        put(notifPeriodGetAllDispose()),
        put(notifPeriodPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifPeriodPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifPeriodPutError(error.message)),
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
  const worker = (action: ReturnType<typeof notifPeriodDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/hr/notification/periods`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifPeriodGetByIdDispose()),
        put(notifPeriodGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(notifPeriodDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifPeriodDeleteError(error.message)),
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
      put(notifPeriodGetAllDispose()),
      put(notifPeriodGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* notifPeriodSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default notifPeriodSagas;