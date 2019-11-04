import { handleResponse } from '@layout/helper/handleResponse';
import { UserAction } from '@layout/store/actions';
import {
  PurchaseAction,
  purchaseGetAllDispose,
  purchaseGetAllError,
  purchaseGetAllRequest,
  purchaseGetAllSuccess,
  purchaseGetByIdDispose,
  purchaseGetByIdError,
  purchaseGetByIdRequest,
  purchaseGetByIdSuccess,
  purchasePostError,
  purchasePostRequest,
  purchasePostSuccess,
  purchasePutError,
  purchasePutRequest,
  purchasePutSuccess,
} from '@purchase/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof purchaseGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/purchase/requests?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetAllSuccess(response.body))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchaseGetAllError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseGetAllError(error.message)),
      ]),
      finallyEffects: [

      ]
    });
  };

  yield takeEvery(PurchaseAction.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof purchaseGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(PurchaseAction.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof purchasePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdDispose()),
        put(purchaseGetAllDispose()),
        put(purchasePostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(purchasePostError(response)),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(purchasePostError(error.message)),
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(PurchaseAction.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof purchasePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdDispose()),
        put(purchaseGetAllDispose()),
        put(purchasePutSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(purchasePutError(response)),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => ([
        put(purchasePutError(error.message)),
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(PurchaseAction.PUT_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(purchaseGetByIdDispose()),
      put(purchaseGetAllDispose()),
    ]);
  }
  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* purchaseRequestSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default purchaseRequestSagas;