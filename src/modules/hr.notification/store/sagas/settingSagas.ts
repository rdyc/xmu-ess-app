import {
  SettingAction as Action,
  settingDeleteError,
  settingDeleteRequest,
  settingDeleteSuccess,
  settingGetAllDispose,
  settingGetAllError,
  settingGetAllRequest,
  settingGetAllSuccess,
  settingGetByIdDispose,
  settingGetByIdError,
  settingGetByIdRequest,
  settingGetByIdSuccess,
  settingPostError,
  settingPostRequest,
  settingPostSuccess,
  settingPutError,
  settingPutRequest,
  settingPutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof settingGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/settings?${params}`,
      successEffects: (response: IApiResponse) => [
        put(settingGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(settingGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(settingGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof settingGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/settings/${action.payload.settingUid}`,
      successEffects: (response: IApiResponse) => [
        put(settingGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(settingGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(settingGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof settingPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/notification/settings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(settingGetByIdDispose()),
        put(settingGetAllDispose()),
        put(settingPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(settingPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(settingPostError(error.message)),
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
  const worker = (action: ReturnType<typeof settingPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/notification/settings/${action.payload.settingUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(settingGetByIdDispose()),
        put(settingGetAllDispose()),
        put(settingPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(settingPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(settingPutError(error.message)),
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
  const worker = (action: ReturnType<typeof settingDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/notification/settings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(settingGetByIdDispose()),
        put(settingGetAllDispose()),
        put(settingDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(settingDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(settingDeleteError(error.message)),
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
      put(settingGetAllDispose()),
      put(settingGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* settingSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default settingSagas;