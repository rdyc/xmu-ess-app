import { UserAction } from '@layout/store/actions';
import {
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
} from '@purchase/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchPurchaseApprovalAllFetchRequest() {
  const worker = (action: ReturnType<typeof purchaseApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/purchase/request?${params}`,
      successEffects: (response: IApiResponse) => [
        put(purchaseApprovalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(purchaseApprovalGetAllError(response)),
      ],
      errorEffects: (error: TypeError) => [
        put(purchaseApprovalGetAllError(error.message)),
      ],
      finallyEffects: [
        // nothing
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
        put(purchaseApprovalGetByIdError(response)),
      ]),
      errorEffects: (error: TypeError) => ([
        put(purchaseApprovalGetByIdError(error.message)),
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
        put(purchaseApprovalPostError(response)),
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
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(PurchaseApprovalAction.POST_APPROVAL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(purchaseApprovalGetAllDispose()),
      put(purchaseApprovalGetByIdDispose()),
    ]);
  }
  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* purchaseApprovalSagas() {
  yield all([
    fork(watchPurchaseApprovalAllFetchRequest),
    fork(watchPurchaseApprovalByIdFetchRequest),
    fork(watchPurchaseApprovalPostFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default purchaseApprovalSagas;