import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  TravelSettlementApprovalAction as Action,
  travelSettlementApprovalGetAllDispose,
  travelSettlementApprovalGetAllError,
  travelSettlementApprovalGetAllRequest,
  travelSettlementApprovalGetAllSuccess,
  travelSettlementApprovalGetByIdDispose,
  travelSettlementApprovalGetByIdError,
  travelSettlementApprovalGetByIdRequest,
  travelSettlementApprovalGetByIdSuccess,
  travelSettlementApprovalPostError,
  travelSettlementApprovalPostRequest,
  travelSettlementApprovalPostSuccess,
} from '@travel/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementApprovalGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/travel/settlement?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementApprovalGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/travel/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementApprovalGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/approvals/travel/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelSettlementApprovalGetAllDispose()),
        put(travelSettlementApprovalPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(travelSettlementApprovalPostError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      }, 
      errorEffects: (error: TypeError) => [
        put(travelSettlementApprovalPostError(error.message)),
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

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(travelSettlementApprovalGetAllDispose()),
      put(travelSettlementApprovalGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* travelSettlementApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchSwitchAccess)

  ]);
}

export default travelSettlementApprovalSagas;