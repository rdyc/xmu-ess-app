import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import {
  MarkdownAction as Action,
  markdownGetAllDispose,
  markdownGetAllError,
  markdownGetAllRequest,
  markdownGetAllSuccess,
  markdownGetByIdDispose,
  markdownGetByIdError,
  markdownGetByIdRequest,
  markdownGetByIdSuccess,
  markdownPostError,
  markdownPostRequest,
  markdownPostSuccess,
  markdownPutError,
  markdownPutRequest,
  markdownPutSuccess
} from '../actions';

// Get All
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof markdownGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/markdown?${params}`,
      successEffects: (response: IApiResponse) => [
        put(markdownGetAllSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(markdownGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(markdownGetAllError(error.message))
      ],
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

// Get By ID
function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof markdownGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/markdown/${action.payload.markdownUid}`,
      successEffects: (response: IApiResponse) => [
        put(markdownGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(markdownGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(markdownGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

// Post
function* watchPostRequest() {
  const worker = (action: ReturnType<typeof markdownPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/markdown`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(markdownGetByIdDispose()),
        put(markdownGetAllDispose()),
        put(markdownPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(markdownPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(markdownPostError(error.message)),
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
  const worker = (action: ReturnType<typeof markdownPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/markdown/${action.payload.markdownUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(markdownGetByIdDispose()),
        put(markdownGetAllDispose()),
        put(markdownPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(markdownPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(markdownPutError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() {
    yield all([put(markdownGetAllDispose()), put(markdownGetByIdDispose())]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* markdownSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default markdownSagas;
