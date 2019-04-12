import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  MileageExceptionAction as Action,
  mileageExceptionGetAllDispose,
  mileageExceptionGetAllError,
  mileageExceptionGetAllRequest,
  mileageExceptionGetAllSuccess,
  mileageExceptionGetByIdDispose,
  mileageExceptionGetByIdError,
  mileageExceptionGetByIdRequest,
  mileageExceptionGetByIdSuccess,
  mileageExceptionGetListError,
  mileageExceptionGetListRequest,
  mileageExceptionGetListSuccess,
  mileageExceptionPostError,
  mileageExceptionPostRequest,
  mileageExceptionPostSuccess,
  mileageExceptionPutError,
  mileageExceptionPutRequest,
  mileageExceptionPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

// Get All
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof mileageExceptionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetAllSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetAllError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetAllError(error.message)),
      ]),
      finallyEffects: [
        // put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

// Get List
function* watchGetListRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetListRequest>
  ) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetListSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetListError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

// Get By ID
function* watchGetByIdRequest() {
  const worker = (
    action: ReturnType<typeof mileageExceptionGetByIdRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/${
        action.payload.mileageExceptionUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(mileageExceptionGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(mileageExceptionGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof mileageExceptionPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/mileageexceptions`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(mileageExceptionGetByIdDispose()),
        put(mileageExceptionGetAllDispose()),
        put(mileageExceptionPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(mileageExceptionPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(mileageExceptionPostError(error.message)),
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
  const worker = (action: ReturnType<typeof mileageExceptionPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/mileageexceptions/${action.payload.mileageExceptionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(mileageExceptionGetByIdDispose()),
        put(mileageExceptionGetAllDispose()),
        put(mileageExceptionPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(mileageExceptionPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(mileageExceptionPutError(error.message)),
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

function* lookupMileageExceptionSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest)
  ]);
}

export default lookupMileageExceptionSagas;
