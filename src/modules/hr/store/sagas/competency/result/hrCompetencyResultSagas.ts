import {
  HrCompetencyResultAction as Action,
  hrCompetencyResultGetAllDispose,
  hrCompetencyResultGetAllError,
  hrCompetencyResultGetAllRequest,
  hrCompetencyResultGetAllSuccess,
  hrCompetencyResultGetByIdDispose,
  hrCompetencyResultGetByIdError,
  hrCompetencyResultGetByIdRequest,
  hrCompetencyResultGetByIdSuccess,
  hrCompetencyResultGetDetailListDispose,
  hrCompetencyResultGetDetailListError,
  hrCompetencyResultGetDetailListRequest,
  hrCompetencyResultGetDetailListSuccess,
  hrCompetencyResultPatchError,
  hrCompetencyResultPatchRequest,
  hrCompetencyResultPatchSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyResultGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/employees?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyResultGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchDetailListRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyResultGetDetailListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/employees/responder?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetDetailListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetDetailListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyResultGetDetailListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_DETAIL_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyResultGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/hr/competency/employees/${action.payload.competencyEmployeeUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyResultGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyResultGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyResultPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'PATCH',
      path: `/v1/hr/competency/employees/${action.payload.competencyEmployeeUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyResultGetByIdDispose()),
        put(hrCompetencyResultGetAllDispose()),
        put(hrCompetencyResultGetDetailListDispose()),
        put(hrCompetencyResultPatchSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyResultPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyResultPatchError(error.message)),
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
      put(hrCompetencyResultGetAllDispose()),
      put(hrCompetencyResultGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyResultSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchDetailListRequest),
    fork(watchFetchByIdRequest),
    fork(watchPatchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyResultSagas;