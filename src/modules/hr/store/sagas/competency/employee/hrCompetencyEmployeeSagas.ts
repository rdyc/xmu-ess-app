import {
  HrCompetencyEmployeeAction as Action,
  hrCompetencyEmployeeGetAllDispose,
  hrCompetencyEmployeeGetAllError,
  hrCompetencyEmployeeGetAllRequest,
  hrCompetencyEmployeeGetAllSuccess,
  hrCompetencyEmployeeGetByIdDispose,
  hrCompetencyEmployeeGetByIdError,
  hrCompetencyEmployeeGetByIdRequest,
  hrCompetencyEmployeeGetByIdSuccess,
  hrCompetencyEmployeeGetDetailListDispose,
  hrCompetencyEmployeeGetDetailListError,
  hrCompetencyEmployeeGetDetailListRequest,
  hrCompetencyEmployeeGetDetailListSuccess,
  hrCompetencyEmployeeGetListError,
  hrCompetencyEmployeeGetListRequest,
  hrCompetencyEmployeeGetListSuccess,
  hrCompetencyEmployeePatchError,
  hrCompetencyEmployeePatchRequest,
  hrCompetencyEmployeePatchSuccess,
  hrCompetencyEmployeePostError,
  hrCompetencyEmployeePostRequest,
  hrCompetencyEmployeePostSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyEmployeeGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/employees?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyEmployeeGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyEmployeeGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/employees/list?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyEmployeeGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchDetailListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyEmployeeGetDetailListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/employees/${action.payload.respondenUid}/${action.payload.positionUid}/${action.payload.assessmentYear}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetDetailListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetDetailListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyEmployeeGetDetailListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_DETAIL_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyEmployeeGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/employees/${action.payload.competencyEmployeeUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyEmployeeGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyEmployeeGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyEmployeePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/employees/${action.payload.respondenUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyEmployeeGetByIdDispose()),
        put(hrCompetencyEmployeeGetAllDispose()),
        put(hrCompetencyEmployeeGetDetailListDispose()),
        put(hrCompetencyEmployeePostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyEmployeePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyEmployeePostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCompetencyEmployeePatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/employees/${action.payload.respondenUid}/${action.payload.positionUid}/${action.payload.competencyEmployeeUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyEmployeeGetByIdDispose()),
        put(hrCompetencyEmployeeGetAllDispose()),
        put(hrCompetencyEmployeeGetDetailListDispose()),
        put(hrCompetencyEmployeePatchSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyEmployeePatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyEmployeePatchError(error.message)),
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
      put(hrCompetencyEmployeeGetAllDispose()),
      put(hrCompetencyEmployeeGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyEmployeeSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchDetailListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPatchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyEmployeeSagas;