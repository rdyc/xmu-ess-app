import {
  KPIFinalAction as Action,
  KPIFinalGetAllDispose,
  KPIFinalGetAllError,
  KPIFinalGetAllRequest,
  KPIFinalGetAllSuccess,
  KPIFinalGetByIdDispose,
  KPIFinalGetByIdError,
  KPIFinalGetByIdRequest,
  KPIFinalGetByIdSuccess,
} from '@kpi/store/actions';
import { UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPIFinalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpis?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPIFinalGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIFinalGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIFinalGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPIFinalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.employeeUid}/kpis/${action.payload.kpiUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPIFinalGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPIFinalGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPIFinalGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(KPIFinalGetAllDispose()),
      put(KPIFinalGetByIdDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiFinalSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchSwitchAccess),
  ]);
}

export default kpiFinalSagas;