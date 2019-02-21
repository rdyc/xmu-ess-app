import { UserAction } from '@layout/store/actions';
import {
  SettlementAction,
  settlementGetAllDispose,
  settlementGetAllError,
  settlementGetAllRequest,
  settlementGetAllSuccess,
  settlementGetByIdDispose,
  settlementGetByIdError,
  settlementGetByIdRequest,
  settlementGetByIdSuccess,
  settlementPostError,
  settlementPostRequest,
  settlementPostSuccess,
  settlementPutError,
  settlementPutRequest,
  settlementPutSuccess,
} from '@purchase/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchSettlementAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/settlements?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementGetAllSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementGetAllError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementGetAllError(error.message)),
      ]),
      finallyEffects: [

      ]
    });
  };

  yield takeEvery(SettlementAction.GET_ALL_SETTLEMENT_REQUEST, worker);
}

function* watchSettlementByIdFetchRequest() {
  const worker = (action: ReturnType<typeof settlementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementGetByIdSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(SettlementAction.GET_BY_ID_SETTLEMENT_REQUEST, worker);
}

function* watchSettlementPostFetchRequest() {
  const worker = (action: ReturnType<typeof settlementPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(settlementGetByIdDispose()),
        put(settlementGetAllDispose()),
        put(settlementPostSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(settlementPostError(response)),
      ]),
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = {
            // information -> based form section name
            information: flattenObject(response.body.errors)
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => ([
        put(settlementPostError(error.message)),
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(SettlementAction.POST_SETTLEMENT_REQUEST, worker);
}

function* watchSettlementPutFetchRequest() {
  const worker = (action: ReturnType<typeof settlementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(settlementGetByIdDispose()),
        put(settlementGetAllDispose()),
        put(settlementPutSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(settlementPutError(response)),
      ]),
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = {
            // information -> based form section name
            information: flattenObject(response.body.errors)
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => ([
        put(settlementPutError(error.message)),
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(SettlementAction.PUT_SETTLEMENT_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(settlementGetByIdDispose()),
      put(settlementGetAllDispose()),
    ]);
  }
  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* purchaseSettlementSagas() {
  yield all([
    fork(watchSettlementAllFetchRequest),
    fork(watchSettlementByIdFetchRequest),
    fork(watchSettlementPostFetchRequest),
    fork(watchSettlementPutFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default purchaseSettlementSagas;