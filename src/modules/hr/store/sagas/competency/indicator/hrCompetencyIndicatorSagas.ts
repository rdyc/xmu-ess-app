import {
  HrCompetencyIndicatorAction as Action,
  hrCompetencyIndicatorGetAllDispose,
  hrCompetencyIndicatorGetAllError,
  hrCompetencyIndicatorGetAllRequest,
  hrCompetencyIndicatorGetAllSuccess,
  hrCompetencyIndicatorGetByIdDispose,
  hrCompetencyIndicatorGetByIdError,
  hrCompetencyIndicatorGetByIdRequest,
  hrCompetencyIndicatorGetByIdSuccess,
  hrCompetencyIndicatorGetListDispose,
  hrCompetencyIndicatorGetListError,
  hrCompetencyIndicatorGetListRequest,
  hrCompetencyIndicatorGetListSuccess,
  hrCompetencyIndicatorPostError,
  hrCompetencyIndicatorPostRequest,
  hrCompetencyIndicatorPostSuccess,
  hrCompetencyIndicatorPutError,
  hrCompetencyIndicatorPutRequest,
  hrCompetencyIndicatorPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyIndicatorGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}/indicators?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyIndicatorGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyIndicatorGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}/indicators/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyIndicatorGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyIndicatorGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}/indicators/${action.payload.indicatorUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyIndicatorGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyIndicatorGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyIndicatorPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}/indicators`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyIndicatorGetByIdDispose()),
        put(hrCompetencyIndicatorGetAllDispose()),
        put(hrCompetencyIndicatorPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyIndicatorPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyIndicatorPostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCompetencyIndicatorPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/competency/clusters/${action.payload.clusterUid}/categories/${action.payload.categoryUid}/levels/${action.payload.levelUid}/indicators/${action.payload.indicatorUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyIndicatorGetByIdDispose()),
        put(hrCompetencyIndicatorGetAllDispose()),
        put(hrCompetencyIndicatorPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyIndicatorPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyIndicatorPutError(error.message)),
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
      put(hrCompetencyIndicatorGetAllDispose()),
      put(hrCompetencyIndicatorGetListDispose()),
      put(hrCompetencyIndicatorGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyIndicatorSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyIndicatorSagas;