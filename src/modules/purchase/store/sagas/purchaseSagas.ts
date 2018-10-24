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
      path: `/v1/purchase/requests${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(purchaseGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(purchaseGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };
  
  yield takeEvery(PurchaseAction.GET_ALL_REQUEST, worker);
}

function* watchPurchaseByIdFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(purchaseGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(purchaseGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
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
      successEffects: (response: IApiResponse) => ([
        put(purchasePostSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchasePostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchasePostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
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
      successEffects: (response: IApiResponse) => ([
        put(purchasePutSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchasePutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchasePutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(PurchaseAction.PUT_REQUEST, worker);
}

function* watchPurchaseApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/request${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(purchaseApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchaseApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(PurchaseApprovalAction.GET_ALL_APPROVAL_REQUEST, worker);
}

function* watchPurchaseApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      successEffects: (response: IApiResponse) => ([
        put(purchaseApprovalGetByIdSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchaseApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(PurchaseApprovalAction.GET_BY_ID_APPROVAL_REQUEST, worker);
}

function* watchPurchaseApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(purchaseApprovalPostSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(purchaseApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(PurchaseApprovalAction.POST_APPROVAL_REQUEST, worker);
}

function* watchSettlementAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/settlements${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
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
        put(settlementGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
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
        put(settlementPostSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
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
        put(settlementPutSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementPutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(SettlementAction.PUT_SETTLEMENT_REQUEST, worker);
}

function* watchSettlementApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        put(listBarLoading(false))
      ]
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_ALL_S_APPROVAL_REQUEST, worker);
}

function* watchSettlementApprovalByIdFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(SettlementApprovalAction.GET_BY_ID_S_APPROVAL_REQUEST, worker);
}

function* watchSettlementApprovalPostFetchRequest() {
  const worker = (action: ReturnType<typeof settlementApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/approvals/purchase/request/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.purchaseUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(settlementApprovalPostSuccess(response.body)),
      ]),
      failureEffects: (response: IApiResponse) => ([
        put(settlementApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      errorEffects: (error: TypeError) => ([
        put(settlementApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(SettlementApprovalAction.POST_S_APPROVAL_REQUEST, worker);
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