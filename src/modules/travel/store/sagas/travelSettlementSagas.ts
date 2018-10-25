import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  TravelSettlementAction as Action,
  travelSettlementGetAllError,
  travelSettlementGetAllRequest,
  travelSettlementGetAllSuccess,
  travelSettlementGetByIdError,
  travelSettlementGetByIdRequest,
  travelSettlementGetByIdSuccess,
  travelSettlementPostError,
  travelSettlementPostRequest,
  travelSettlementPostSuccess,
  travelSettlementPutRequest,
} from '@travel/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/settlements${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementGetAllError(error.message)),
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
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.traveSettlementlUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
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
      method: 'post',
      path: `/v1/travel/registrations/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementPostSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof travelSettlementPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/travel/settlements/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelSettlementUid}`,
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(travelSettlementPostSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(travelSettlementPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(travelSettlementPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* travelSettlementSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default travelSettlementSagas;