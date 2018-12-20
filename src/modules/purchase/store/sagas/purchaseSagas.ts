import { layoutAlertAdd } from '@layout/store/actions';
import {
  PurchaseAction,
  PurchaseApprovalAction,
  purchaseApprovalGetAllDispose,
  purchaseApprovalGetAllError,
  purchaseApprovalGetAllRequest,
  purchaseApprovalGetAllSuccess,
  purchaseApprovalGetByIdDispose,
  purchaseApprovalGetByIdError,
  purchaseApprovalGetByIdRequest,
  purchaseApprovalGetByIdSuccess,
  purchaseApprovalPostError,
  purchaseApprovalPostRequest,
  purchaseApprovalPostSuccess,
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
  SettlementAction,
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
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchPurchaseAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/purchase/requests${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(purchaseGetAllSuccess(response.body))
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
        put(purchaseGetByIdDispose()),
        put(purchaseGetAllDispose()),
        put(purchasePostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(purchasePostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
      errorEffects: (error: TypeError) => [
        put(purchasePostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
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
        put(purchaseGetByIdDispose()),
        put(purchaseGetAllDispose()),
        put(purchasePutSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(purchasePutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]),
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = {
            // information -> based on form section name
            information: flattenObject(response.body.errors)
          };

          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => ([
        put(purchasePutError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(PurchaseAction.PUT_REQUEST, worker);
}

function* watchPurchaseApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/project?${params}`,
      successEffects: (response: IApiResponse) => [
        put(purchaseApprovalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(purchaseApprovalGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(purchaseApprovalGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(PurchaseAction.GET_ALL_REQUEST, worker);
}

// function* watchPurchaseApprovalAllFetchRequest() {
//   const worker = (action: ReturnType<typeof purchaseApprovalGetAllRequest>) => {
//     return saiyanSaga.fetch({
//       method: 'get',
//       path: `/v1/approvals/purchase/request${objectToQuerystring(action.payload.filter)}`,
//       successEffects: (response: IApiResponse) => ([
//         put(purchaseApprovalGetAllSuccess(response.body))
//       ]),
//       failureEffects: (response: IApiResponse) => ([
//         put(purchaseApprovalGetAllError(response.body)),
//         put(layoutAlertAdd({
//           time: new Date(),
//           message: response.statusText,
//           details: response
//         })),
//       ]),
//       errorEffects: (error: TypeError) => ([
//         put(purchaseApprovalGetAllError(error.message)),
//         put(layoutAlertAdd({
//           time: new Date(),
//           message: error.message
//         }))
//       ]),
//       finallyEffects: [

//       ]
//     });
//   };

//   yield takeEvery(PurchaseApprovalAction.GET_ALL_APPROVAL_REQUEST, worker);
// }

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
        put(purchaseApprovalGetAllDispose()),
        put(purchaseApprovalGetByIdDispose()),
        put(purchaseApprovalPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(purchaseApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
        put(purchaseApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
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
        put(settlementGetByIdDispose()),
        put(settlementGetAllDispose()),
        put(settlementPostSuccess(response.body)),
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(settlementPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
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
        put(settlementPutError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
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
        put(settlementApprovalPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
        put(settlementApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
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