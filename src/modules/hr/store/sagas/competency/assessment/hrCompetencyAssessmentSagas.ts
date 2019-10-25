import {
  HrCompetencyAssessmentAction as Action,
  hrCompetencyAssessmentGetAllDispose,
  hrCompetencyAssessmentGetAllError,
  hrCompetencyAssessmentGetAllRequest,
  hrCompetencyAssessmentGetAllSuccess,
  hrCompetencyAssessmentGetByIdDispose,
  hrCompetencyAssessmentGetByIdError,
  hrCompetencyAssessmentGetByIdRequest,
  hrCompetencyAssessmentGetByIdSuccess,
  hrCompetencyAssessmentPostError,
  hrCompetencyAssessmentPostRequest,
  hrCompetencyAssessmentPostSuccess,
  hrCompetencyAssessmentPutError,
  hrCompetencyAssessmentPutRequest,
  hrCompetencyAssessmentPutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyAssessmentGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/competency/assessments?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyAssessmentGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyAssessmentGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyAssessmentGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyAssessmentGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/hr/competency/assessments/${action.payload.assessmentUid}`,
      successEffects: (response: IApiResponse) => ([
        put(hrCompetencyAssessmentGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(hrCompetencyAssessmentGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(hrCompetencyAssessmentGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrCompetencyAssessmentPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/hr/competency/assessments`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyAssessmentGetByIdDispose()),
        put(hrCompetencyAssessmentGetAllDispose()),
        put(hrCompetencyAssessmentPostSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyAssessmentPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyAssessmentPostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrCompetencyAssessmentPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/hr/competency/assessments/${action.payload.assessmentUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrCompetencyAssessmentGetByIdDispose()),
        put(hrCompetencyAssessmentGetAllDispose()),
        put(hrCompetencyAssessmentPutSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrCompetencyAssessmentPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrCompetencyAssessmentPutError(error.message)),
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
      put(hrCompetencyAssessmentGetAllDispose()),
      put(hrCompetencyAssessmentGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);

}
function* hrCompetencyAssessmentSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrCompetencyAssessmentSagas;