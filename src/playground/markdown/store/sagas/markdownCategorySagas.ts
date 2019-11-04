import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import {
  MarkdownCategoryAction as Action,
  markdownCategoryGetAllDispose,
  markdownCategoryGetAllError,
  markdownCategoryGetAllRequest,
  markdownCategoryGetAllSuccess,
  markdownCategoryGetByIdDispose,
  markdownCategoryGetByIdError,
  markdownCategoryGetByIdRequest,
  markdownCategoryGetByIdSuccess,
  markdownCategoryGetListError,
  markdownCategoryGetListRequest,
  markdownCategoryGetListSuccess,
  markdownCategoryPostError,
  markdownCategoryPostRequest,
  markdownCategoryPostSuccess,
  markdownCategoryPutError,
  markdownCategoryPutRequest,
  markdownCategoryPutSuccess
} from '../actions';

// Get All
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof markdownCategoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/markdown/category?${params}`,
      successEffects: (response: IApiResponse) => [
        put(markdownCategoryGetAllSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(markdownCategoryGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(markdownCategoryGetAllError(error.message))
      ],
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof markdownCategoryGetListRequest>) => {
    const params = qs.stringify(action.payload, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/markdown/category?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(markdownCategoryGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(markdownCategoryGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(markdownCategoryGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

// Get By ID
function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof markdownCategoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/markdown/category/${action.payload.uid}`,
      successEffects: (response: IApiResponse) => [
        put(markdownCategoryGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(markdownCategoryGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(markdownCategoryGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

// Post
function* watchPostRequest() {
  const worker = (action: ReturnType<typeof markdownCategoryPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/markdown/category`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(markdownCategoryGetByIdDispose()),
        put(markdownCategoryGetAllDispose()),
        put(markdownCategoryPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(markdownCategoryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(markdownCategoryPostError(error.message)),
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

// PUT
function* watchPutRequest() {
  const worker = (action: ReturnType<typeof markdownCategoryPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/markdown/category/${action.payload.uid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(markdownCategoryGetByIdDispose()),
        put(markdownCategoryGetAllDispose()),
        put(markdownCategoryPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(markdownCategoryPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);

        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(markdownCategoryPutError(error.message)),
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
    yield all([put(markdownCategoryGetAllDispose()), put(markdownCategoryGetByIdDispose())]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* markdownCategorySagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchFetchListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default markdownCategorySagas;
