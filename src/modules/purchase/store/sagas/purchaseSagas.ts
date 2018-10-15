import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  PurchaseAction,
  PurchaseApprovalAction,
  purchaseApprovalGetAllError,
  purchaseApprovalGetAllRequest,
  purchaseApprovalGetAllSuccess,
  purchaseApprovalGetByIdError,
  purchaseApprovalGetByIdRequest,
  purchaseApprovalGetByIdSuccess,
  purchaseGetAllError,
  purchaseGetAllRequest,
  purchaseGetAllSuccess,
  purchaseGetByIdError,
  purchaseGetByIdRequest,
  purchaseGetByIdSuccess,
  SettlementAction,
  SettlementApprovalAction,
  settlementApprovalGetAllError,
  settlementApprovalGetAllRequest,
  settlementApprovalGetAllSuccess,
  settlementApprovalGetByIdError,
  settlementApprovalGetByIdRequest,
  settlementApprovalGetByIdSuccess,
  settlementGetAllError,
  settlementGetAllRequest,
  settlementGetAllSuccess,
  settlementGetByIdError,
  settlementGetByIdRequest,
  settlementGetByIdSuccess,
} from '@purchase/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchPurchaseAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(purchaseGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(purchaseGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(purchaseGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };
  
  yield takeEvery(PurchaseAction.GET_ALL_REQUEST, worker);
}

function* watchPurchaseByIdFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`, 
      success: (response: IApiResponse) => ([
        put(purchaseGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(purchaseGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(purchaseGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(PurchaseAction.GET_BY_ID_REQUEST, worker);
}

function* watchPurchaseApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(purchaseApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failed: (response: IApiResponse) => ([
        put(purchaseApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(purchaseApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };

  yield takeEvery(PurchaseAction.GET_ALL_REQUEST, worker);
}

function* watchPurchaseApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      success: (response: IApiResponse) => ([
        put(purchaseApprovalGetByIdSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(purchaseApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(purchaseApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(PurchaseApprovalAction.GET_BY_ID_REQUEST, worker);
}

function* watchSettlementAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(settlementGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };

  yield takeEvery(SettlementAction.GET_ALL_REQUEST, worker);
}

function* watchSettlementByIdFetchRequest() {
  const worker = (action: ReturnType<typeof settlementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      success: (response: IApiResponse) => ([
        put(settlementGetByIdSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(SettlementAction.GET_BY_ID_REQUEST, worker);
}

function* watchSettlementApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement/${action.payload.companyUid}/${action.payload.positionUid}${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(settlementApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        put(listBarLoading(false))
      ])
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_ALL_REQUEST, worker);
}

function* watchSettlementApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      success: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([
        // nothing
      ])
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_BY_ID_REQUEST, worker);
}

function* purchaseSagas() {
  yield all([
    fork(watchPurchaseAllFetchRequest),
    fork(watchPurchaseByIdFetchRequest),
    fork(watchPurchaseApprovalAllFetchRequest),
    fork(watchPurchaseApprovalByIdFetchRequest),
    fork(watchSettlementAllFetchRequest),
    fork(watchSettlementByIdFetchRequest),
    fork(watchSettlementApprovalAllFetchRequest),
    fork(watchSettlementApprovalByIdFetchRequest),
  ]);
}

export default purchaseSagas;