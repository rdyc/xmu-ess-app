import { UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { EmployeeFinalAction as Action, employeeFinalGetDetailDispose, employeeFinalGetDetailError, employeeFinalGetDetailRequest, employeeFinalGetDetailSuccess } from '../actions';

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof employeeFinalGetDetailRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/finals/${action.payload.employeeUid}/${action.payload.positionUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(employeeFinalGetDetailSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(employeeFinalGetDetailError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(employeeFinalGetDetailError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(employeeFinalGetDetailDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* employeeFinalSagas() {
  yield all([
    fork(watchByIdFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default employeeFinalSagas;