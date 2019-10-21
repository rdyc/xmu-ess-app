import {
  HrCompetencyClusterAction as Action,
  hrCompetencyClusterGetAllDispose,
  hrCompetencyClusterGetAllError,
  hrCompetencyClusterGetAllRequest,
  hrCompetencyClusterGetAllSuccess,
  hrCompetencyClusterGetByIdDispose,
  hrCompetencyClusterGetByIdError,
  hrCompetencyClusterGetByIdRequest,
  hrCompetencyClusterGetByIdSuccess,
  hrCompetencyClusterGetListDispose,
  hrCompetencyClusterGetListError,
  hrCompetencyClusterGetListRequest,
  hrCompetencyClusterGetListSuccess,
  hrCompetencyClusterPatchError,
  hrCompetencyClusterPatchRequest,
  hrCompetencyClusterPatchSuccess,
  hrCompetencyClusterPostError,
  hrCompetencyClusterPostRequest,
  hrCompetencyClusterPostSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyClusterGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/competency/cluster?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyClusterGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyClusterGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/competency/cluster/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyClusterGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyClusterGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/competency/cluster/${action.payload.competencyUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyClusterGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyClusterGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyClusterPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/competency/cluster`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyClusterGetByIdDispose()),
        put(hrCompetencyClusterGetAllDispose()),
        put(hrCompetencyClusterPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyClusterPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyClusterPostError(error.message)),
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

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyClusterPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/hr/competency/cluster/${action.payload.clusterUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyClusterGetByIdDispose()),
        put(hrCompetencyClusterGetAllDispose()),
        put(hrCompetencyClusterPatchSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyClusterPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyClusterPatchError(error.message)),
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

  yield takeEvery(Action.PATCH_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() {
    yield all([
      put(hrCompetencyClusterGetAllDispose()),
      put(hrCompetencyClusterGetListDispose()),
      put(hrCompetencyClusterGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}

function* hrCompetencyClusterSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPatchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyClusterSagas;