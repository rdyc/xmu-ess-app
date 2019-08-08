import {
  HrCompetencyLevelAction as Action,
  hrCompetencyLevelGetAllDispose,
  hrCompetencyLevelGetAllError,
  hrCompetencyLevelGetAllRequest,
  hrCompetencyLevelGetAllSuccess,
  hrCompetencyLevelGetByIdDispose,
  hrCompetencyLevelGetByIdError,
  hrCompetencyLevelGetByIdRequest,
  hrCompetencyLevelGetByIdSuccess,
  hrCompetencyLevelGetListDispose,
  hrCompetencyLevelGetListError,
  hrCompetencyLevelGetListRequest,
  hrCompetencyLevelGetListSuccess,
  hrCompetencyLevelPostError,
  hrCompetencyLevelPostRequest,
  hrCompetencyLevelPostSuccess,
  hrCompetencyLevelPutError,
  hrCompetencyLevelPutRequest,
  hrCompetencyLevelPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyLevelGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyLevelGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyLevelGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyLevelGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyLevelGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyLevelGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyLevelGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyLevelPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyLevelGetByIdDispose()),
        put(hrCompetencyLevelGetAllDispose()),
        put(hrCompetencyLevelPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyLevelPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyLevelPostError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyLevelPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyLevelGetByIdDispose()),
        put(hrCompetencyLevelGetAllDispose()),
        put(hrCompetencyLevelPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyLevelPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyLevelPutError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
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
      put(hrCompetencyLevelGetAllDispose()),
      put(hrCompetencyLevelGetListDispose()),
      put(hrCompetencyLevelGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyLevelSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyLevelSagas;