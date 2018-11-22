import { layoutAlertAdd } from '@layout/store/actions';
import {
  TravelSettlementApprovalAction as Action,
  travelSettlementApprovalGetAllDispose,
  travelSettlementApprovalGetAllError,
  travelSettlementApprovalGetAllRequest,
  travelSettlementApprovalGetAllSuccess,
  travelSettlementApprovalGetByIdError,
  travelSettlementApprovalGetByIdRequest,
  travelSettlementApprovalGetByIdSuccess,
  travelSettlementApprovalPostError,
  travelSettlementApprovalPostRequest,
  travelSettlementApprovalPostSuccess,
} from '@travel/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementApprovalGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/approvals/travel/settlement${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetAllSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
      method: 'get',
      path: `/v1/approvals/travel/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementApprovalGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
      method: 'post',
      path: `/v1/approvals/travel/settlement/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelSettlementApprovalPostSuccess(response.body)),
        put(travelSettlementApprovalGetAllDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(travelSettlementApprovalPostError(response.statusText)),
      ],
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

function* travelSettlementApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest)
  ]);
}

export default travelSettlementApprovalSagas;