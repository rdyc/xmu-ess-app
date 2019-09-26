import {
  HrCornerCategoryAction as Action,
  hrCornerCategoryDeleteError,
  hrCornerCategoryDeleteRequest,
  hrCornerCategoryDeleteSuccess,
  hrCornerCategoryGetAllDispose,
  hrCornerCategoryGetAllError,
  hrCornerCategoryGetAllRequest,
  hrCornerCategoryGetAllSuccess,
  hrCornerCategoryGetByIdDispose,
  hrCornerCategoryGetByIdError,
  hrCornerCategoryGetByIdRequest,
  hrCornerCategoryGetByIdSuccess,
  hrCornerCategoryGetListDispose,
  hrCornerCategoryGetListError,
  hrCornerCategoryGetListRequest,
  hrCornerCategoryGetListSuccess,
  hrCornerCategoryPostError,
  hrCornerCategoryPostRequest,
  hrCornerCategoryPostSuccess,
  hrCornerCategoryPutError,
  hrCornerCategoryPutRequest,
  hrCornerCategoryPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCornerCategoryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/corner/categories?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerCategoryGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCornerCategoryGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/corner/categories/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerCategoryGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCornerCategoryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/corner/categories/${action.payload.categoryUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCornerCategoryGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCornerCategoryGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCornerCategoryPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/corner/categories`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerCategoryGetByIdDispose()),
        put(hrCornerCategoryGetAllDispose()),
        put(hrCornerCategoryPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerCategoryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerCategoryPostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCornerCategoryPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/corner/categories/${action.payload.categoryUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerCategoryGetByIdDispose()),
        put(hrCornerCategoryGetAllDispose()),
        put(hrCornerCategoryPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerCategoryPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerCategoryPutError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCornerCategoryDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/hr/corner/categories`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCornerCategoryGetByIdDispose()),
        put(hrCornerCategoryGetAllDispose()),
        put(hrCornerCategoryDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCornerCategoryDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCornerCategoryDeleteError(error.message)),
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
      put(hrCornerCategoryGetAllDispose()),
      put(hrCornerCategoryGetListDispose()),
      put(hrCornerCategoryGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* hrCornerCategorySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCornerCategorySagas;