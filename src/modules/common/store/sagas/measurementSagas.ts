import {
  MeasurementAction as Action,
  measurementGetAllError,
  measurementGetAllRequest,
  measurementGetAllSuccess,
  measurementGetByIdError,
  measurementGetByIdRequest,
  measurementGetByIdSuccess,
  measurementGetListError,
  measurementGetListRequest,
  measurementGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof measurementGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(measurementGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(measurementGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(measurementGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof measurementGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(measurementGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(measurementGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(measurementGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof measurementGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(measurementGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(measurementGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(measurementGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonMeasurementSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonMeasurementSagas;