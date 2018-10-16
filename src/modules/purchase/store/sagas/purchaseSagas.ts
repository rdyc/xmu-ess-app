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
  purchaseApprovalPostError,
  purchaseApprovalPostRequest,
  purchaseApprovalPostSuccess,
  purchaseGetAllError,
  purchaseGetAllRequest,
  purchaseGetAllSuccess,
  purchaseGetByIdError,
  purchaseGetByIdRequest,
  purchaseGetByIdSuccess,
  // purchasePostDispose,
  purchasePostError,
  purchasePostRequest,
  purchasePostSuccess,
  // purchasePutDispose,
  purchasePutError,
  purchasePutRequest,
  purchasePutSuccess,
  SettlementAction,
  SettlementApprovalAction,
  settlementApprovalGetAllError,
  settlementApprovalGetAllRequest,
  settlementApprovalGetAllSuccess,
  settlementApprovalGetByIdError,
  settlementApprovalGetByIdRequest,
  settlementApprovalGetByIdSuccess,
  settlementApprovalPostError,
  settlementApprovalPostRequest,
  settlementApprovalPostSuccess,
  settlementGetAllError,
  settlementGetAllRequest,
  settlementGetAllSuccess,
  settlementGetByIdError,
  settlementGetByIdRequest,
  settlementGetByIdSuccess,
  // settlementPostDispose,
  settlementPostError,
  settlementPostRequest,
  settlementPostSuccess,
  // settlementPutDispose,
  settlementPutError,
  settlementPutRequest,
  settlementPutSuccess,
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

function* watchPurchasePostFetchRequest() {
  const worker = (action: ReturnType<typeof purchasePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(purchasePostSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(purchasePostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(purchasePostError(error.message)),
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

  yield takeEvery(PurchaseAction.POST_REQUEST, worker);
}

function* watchPurchasePutFetchRequest() {
  const worker = (action: ReturnType<typeof purchasePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(purchasePutSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(purchasePutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(purchasePutError(error.message)),
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

  yield takeEvery(PurchaseAction.PUT_REQUEST, worker);
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

function* watchPurchaseApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(purchaseApprovalPostSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(purchaseApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(purchaseApprovalPostError(error.message)),
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

  yield takeEvery(PurchaseApprovalAction.POST_REQUEST, worker);
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

function* watchSettlementPostFetchRequest() {
  const worker = (action: ReturnType<typeof settlementPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(settlementPostSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementPostError(error.message)),
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

  yield takeEvery(SettlementAction.POST_REQUEST, worker);
}

function* watchSettlementPutFetchRequest() {
  const worker = (action: ReturnType<typeof settlementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/purchase/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(settlementPutSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementPutError(error.message)),
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

  yield takeEvery(SettlementAction.PUT_REQUEST, worker);
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

function* watchSettlementApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      success: (response: IApiResponse) => ([
        put(settlementApprovalPostSuccess(response.body)),
      ]),
      failed: (response: IApiResponse) => ([
        put(settlementApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      error: (error: TypeError) => ([
        put(settlementApprovalPostError(error.message)),
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

  yield takeEvery(SettlementApprovalAction.POST_REQUEST, worker);
}

function* purchaseSagas() {
  yield all([
    fork(watchPurchaseAllFetchRequest),
    fork(watchPurchaseByIdFetchRequest),
    fork(watchPurchasePostFetchRequest),
    fork(watchPurchasePutFetchRequest),
    fork(watchPurchaseApprovalAllFetchRequest),
    fork(watchPurchaseApprovalByIdFetchRequest),
    fork(watchPurchaseApprovalPostFetchRequest),
    fork(watchSettlementAllFetchRequest),
    fork(watchSettlementByIdFetchRequest),
    fork(watchSettlementPostFetchRequest),
    fork(watchSettlementPutFetchRequest),
    fork(watchSettlementApprovalAllFetchRequest),
    fork(watchSettlementApprovalByIdFetchRequest),
    fork(watchSettlementApprovalPostFetchRequest),
  ]);
}

export default purchaseSagas;