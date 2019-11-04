import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  travelGetAllDispose,
  TravelSettlementAction as Action,
  travelSettlementGetAllDispose,
  travelSettlementGetAllError,
  travelSettlementGetAllRequest,
  travelSettlementGetAllSuccess,
  travelSettlementGetByIdDispose,
  travelSettlementGetByIdError,
  travelSettlementGetByIdRequest,
  travelSettlementGetByIdSuccess,
  travelSettlementPostError,
  travelSettlementPostRequest,
  travelSettlementPostSuccess,
  travelSettlementPutRequest,
  travelSettlementPutSuccess,
} from '@travel/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/travel/settlements?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementGetAllError(error.message)),
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
  const worker = (action: ReturnType<typeof travelSettlementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/travel/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementGetByIdError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementGetByIdError(error.message)),
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
  const worker = (action: ReturnType<typeof travelSettlementPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/travel/settlements/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelSettlementGetAllDispose()),
        put(travelGetAllDispose()),
        put(travelSettlementPostSuccess(response.body))
      ], 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(travelSettlementPostError(response.statusText)),      
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      }, 
      errorEffects: (error: TypeError) => [
        put(travelSettlementPostError(error.message)),
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

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/travel/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => [
        put(travelSettlementGetAllDispose()),
        put(travelSettlementGetByIdDispose()),
        put(travelSettlementPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      }, 
      failureEffects: (response: IApiResponse) => [
        put(travelSettlementPostError(response.statusText)),
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      }, 
      errorEffects: (error: TypeError) => [
        put(travelSettlementPostError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(travelSettlementGetAllDispose()),
      put(travelSettlementGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}
function* travelSettlementSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default travelSettlementSagas;