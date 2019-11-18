import {
  NotifTemplateAction as Action,
  notifTemplateDeleteError,
  notifTemplateDeleteRequest,
  notifTemplateGetAllDispose,
  notifTemplateGetAllError,
  notifTemplateGetAllRequest,
  notifTemplateGetAllSuccess,
  notifTemplateGetByIdDispose,
  notifTemplateGetByIdError,
  notifTemplateGetByIdRequest,
  notifTemplateGetByIdSuccess,
  notifTemplateGetListDispose,
  notifTemplateGetListError,
  notifTemplateGetListRequest,
  notifTemplateGetListSuccess,
  notifTemplatePostError,
  notifTemplatePostRequest,
  notifTemplatePostSuccess,
  notifTemplatePutError,
  notifTemplatePutRequest,
  notifTemplatePutSuccess,
} from '@hr.notification/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof notifTemplateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/notification/templates?${params}`,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifTemplateGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifTemplateGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof notifTemplateGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/notification/templates/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetListSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifTemplateGetListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifTemplateGetListError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof notifTemplateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/notification/templates/${action.payload.templateUid}`,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(notifTemplateGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(notifTemplateGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof notifTemplatePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/hr/notification/templates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetByIdDispose()),
        put(notifTemplateGetAllDispose()),
        put(notifTemplatePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifTemplatePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifTemplatePostError(error.message)),
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
  const worker = (action: ReturnType<typeof notifTemplatePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/hr/notification/templates/${action.payload.templateUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetByIdDispose()),
        put(notifTemplateGetAllDispose()),
        put(notifTemplatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(notifTemplatePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifTemplatePutError(error.message)),
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
  const worker = (action: ReturnType<typeof notifTemplateDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/hr/notification/templates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(notifTemplateGetByIdDispose()),
        put(notifTemplateGetAllDispose()),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(notifTemplateDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(notifTemplateDeleteError(error.message)),
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
      put(notifTemplateGetAllDispose()),
      put(notifTemplateGetListDispose()),
      put(notifTemplateGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* notifTemplateSagas() {
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

export default notifTemplateSagas;