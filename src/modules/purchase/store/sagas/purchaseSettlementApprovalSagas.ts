import { handleResponse } from '@layout/helper/handleResponse';
import { UserAction } from '@layout/store/actions';
import {
  SettlementApprovalAction,
  settlementApprovalGetAllDispose,
  settlementApprovalGetAllError,
  settlementApprovalGetAllRequest,
  settlementApprovalGetAllSuccess,
  settlementApprovalGetByIdDispose,
  settlementApprovalGetByIdError,
  settlementApprovalGetByIdRequest,
  settlementApprovalGetByIdSuccess,
  settlementApprovalPostError,
  settlementApprovalPostRequest,
  settlementApprovalPostSuccess,
} from '@purchase/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetAllSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetAllError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalGetAllError(error.message)),
      ]),
      finallyEffects: [

      ]
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_ALL_S_APPROVAL_REQUEST, worker);
}

function* watchGetByIdFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/purchase/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetAllDispose()),
        put(settlementApprovalGetByIdDispose()),
        put(settlementApprovalPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalPostError(response)),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalPostError(error.message)),
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(SettlementApprovalAction.POST_S_APPROVAL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(settlementApprovalGetAllDispose()),
      put(settlementApprovalGetByIdDispose()),
    ]);
  }
  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* purchaseSettlementApprovalSagas() {
  yield all([
    fork(watchGetAllFetchRequest),
    fork(watchGetByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default purchaseSettlementApprovalSagas;