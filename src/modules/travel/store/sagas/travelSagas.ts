import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  TravelAction as Action,
  travelGetAllError,
  travelGetAllRequest,
  travelGetAllSuccess,
  travelGetByIdError,
  travelGetByIdRequest,
  travelGetByIdSuccess,
  travelPostError,
  travelPostRequest,
  travelPostSuccess,
  travelPutRequest,
} from '@travel/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetAllRequest>) => { 
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/requests${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(travelGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(travelGetAllError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(travelGetAllError(error.message)),
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
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof travelGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`, 
      success: (response: IApiResponse) => ([
        put(travelGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(travelGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(travelGetByIdError(error.message)),
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

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof travelPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/travel/registrations/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(travelPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(travelPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(travelPostError(error.message)),
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

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof travelPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/travel/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.travelUid}`,
      payload: action.payload.data, 
      success: (response: IApiResponse) => ([
        put(travelPostSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(travelPostError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        })),
      ]), 
      error: (error: TypeError) => ([
        put(travelPostError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* travelSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default travelSagas;