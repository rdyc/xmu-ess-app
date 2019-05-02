import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupMileageExceptionAction as Action,
  lookupMileageExceptionGetAllDispose,
  lookupMileageExceptionGetAllError,
  lookupMileageExceptionGetAllRequest,
  lookupMileageExceptionGetAllSuccess,
  lookupMileageExceptionGetByIdDispose,
  lookupMileageExceptionGetByIdError,
  lookupMileageExceptionGetByIdRequest,
  lookupMileageExceptionGetByIdSuccess,
  lookupMileageExceptionGetListError,
  lookupMileageExceptionGetListRequest,
  lookupMileageExceptionGetListSuccess,
  lookupMileageExceptionPostError,
  lookupMileageExceptionPostRequest,
  lookupMileageExceptionPostSuccess,
  lookupMileageExceptionPutError,
  lookupMileageExceptionPutRequest,
  lookupMileageExceptionPutSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

// Get All
function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof lookupMileageExceptionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetAllSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetAllError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetAllError(error.message)),
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
    action: ReturnType<typeof lookupMileageExceptionGetListRequest>
  ) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetListSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetListError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

// Get By ID
function* watchGetByIdRequest() {
  const worker = (
    action: ReturnType<typeof lookupMileageExceptionGetByIdRequest>
  ) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/mileageexceptions/${
        action.payload.mileageExceptionUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetByIdSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(lookupMileageExceptionGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(lookupMileageExceptionGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupMileageExceptionPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/mileageexceptions`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupMileageExceptionGetByIdDispose()),
        put(lookupMileageExceptionGetAllDispose()),
        put(lookupMileageExceptionPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupMileageExceptionPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupMileageExceptionPostError(error.message)),
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
  const worker = (action: ReturnType<typeof lookupMileageExceptionPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/lookup/mileageexceptions/${action.payload.mileageExceptionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupMileageExceptionGetByIdDispose()),
        put(lookupMileageExceptionGetAllDispose()),
        put(lookupMileageExceptionPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupMileageExceptionPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupMileageExceptionPutError(error.message)),
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
