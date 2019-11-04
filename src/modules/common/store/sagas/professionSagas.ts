import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { 
  ProfessionAction as Action,
  professionGetAllError, 
  professionGetAllRequest, 
  professionGetAllSuccess, 
  professionGetByIdError, 
  professionGetByIdRequest, 
  professionGetByIdSuccess, 
  professionGetListError, 
  professionGetListRequest, 
  professionGetListSuccess 
} from '../actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof professionGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(professionGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(professionGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(professionGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof professionGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(professionGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(professionGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(professionGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof professionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(professionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(professionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(professionGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonProfessionSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonProfessionSagas;