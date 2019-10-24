import {
  NotifSettingAction as Action,
  notifSettingDeleteError,
  notifSettingDeleteRequest,
  notifSettingDeleteSuccess,
  notifSettingGetAllDispose,
  notifSettingGetAllError,
  notifSettingGetAllRequest,
  notifSettingGetAllSuccess,
  notifSettingGetByIdDispose,
  notifSettingGetByIdError,
  notifSettingGetByIdRequest,
  notifSettingGetByIdSuccess,
  notifSettingPostError,
  notifSettingPostRequest,
  notifSettingPostSuccess,
  notifSettingPutError,
  notifSettingPutRequest,
  notifSettingPutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof notifSettingGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/settings?${params}`,
      successEffects: (response: IApiResponse) => [
        put(notifSettingGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifSettingGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifSettingGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof notifSettingGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/settings/${action.payload.settingUid}`,
      successEffects: (response: IApiResponse) => [
        put(notifSettingGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifSettingGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifSettingGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof notifSettingPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/notification/settings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifSettingGetByIdDispose()),
        put(notifSettingGetAllDispose()),
        put(notifSettingPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifSettingPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifSettingPostError(error.message)),
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
  const worker = (action: ReturnType<typeof notifSettingPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/notification/settings/${action.payload.settingUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifSettingGetByIdDispose()),
        put(notifSettingGetAllDispose()),
        put(notifSettingPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifSettingPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifSettingPutError(error.message)),
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
  const worker = (action: ReturnType<typeof notifSettingDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/notification/settings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifSettingGetByIdDispose()),
        put(notifSettingGetAllDispose()),
        put(notifSettingDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifSettingDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifSettingDeleteError(error.message)),
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
      put(notifSettingGetAllDispose()),
      put(notifSettingGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* notifSettingSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default notifSettingSagas;