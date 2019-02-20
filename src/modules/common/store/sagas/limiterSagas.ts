import {
  LimiterAction as Action,
  limiterGetAllError,
  limiterGetAllRequest,
  limiterGetAllSuccess,
  limiterGetByIdError,
  limiterGetByIdRequest,
  limiterGetByIdSuccess,
  limiterGetListError,
  limiterGetListRequest,
  limiterGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof limiterGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(limiterGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(limiterGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(limiterGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof limiterGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(limiterGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(limiterGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(limiterGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof limiterGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(limiterGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(limiterGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(limiterGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonLimiterSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonLimiterSagas;