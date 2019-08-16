import {
  TemplateAction as Action,
  templateDeleteError,
  templateDeleteRequest,
  templateDeleteSuccess,
  templateGetAllDispose,
  templateGetAllError,
  templateGetAllRequest,
  templateGetAllSuccess,
  templateGetByIdDispose,
  templateGetByIdError,
  templateGetByIdRequest,
  templateGetByIdSuccess,
  templateGetListDispose,
  templateGetListRequest,
  templatePostError,
  templatePostRequest,
  templatePostSuccess,
  templatePutError,
  templatePutRequest,
  templatePutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof templateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/templates?${params}`,
      successEffects: (response: IApiResponse) => [
        put(templateGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(templateGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(templateGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof templateGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/templates/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(templateGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(templateGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(templateGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof templateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/notification/templates/${action.payload.templateUid}`,
      successEffects: (response: IApiResponse) => [
        put(templateGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(templateGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(templateGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof templatePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/notification/templates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(templateGetByIdDispose()),
        put(templateGetAllDispose()),
        put(templatePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(templatePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(templatePostError(error.message)),
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
  const worker = (action: ReturnType<typeof templatePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/notification/templates/${action.payload.templateUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(templateGetByIdDispose()),
        put(templateGetAllDispose()),
        put(templatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(templatePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(templatePutError(error.message)),
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
  const worker = (action: ReturnType<typeof templateDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/notification/templates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(templateGetByIdDispose()),
        put(templateGetAllDispose()),
        put(templateDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(templateDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(templateDeleteError(error.message)),
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
      put(templateGetAllDispose()),
      put(templateGetListDispose()),
      put(templateGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* templateSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default templateSagas;