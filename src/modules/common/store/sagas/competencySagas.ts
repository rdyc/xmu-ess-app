import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { 
  CompetencyAction as Action,
  competencyGetAllError, 
  competencyGetAllRequest, 
  competencyGetAllSuccess, 
  competencyGetByIdError, 
  competencyGetByIdRequest, 
  competencyGetByIdSuccess, 
  competencyGetListError, 
  competencyGetListRequest, 
  competencyGetListSuccess 
} from '../actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof competencyGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(competencyGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(competencyGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(competencyGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof competencyGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(competencyGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(competencyGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(competencyGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof competencyGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(competencyGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(competencyGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(competencyGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonCompetencySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonCompetencySagas;