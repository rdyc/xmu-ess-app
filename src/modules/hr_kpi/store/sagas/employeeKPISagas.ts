import { newHostAddress } from '@constants/newHostAddress';
import {
  EmployeeKPIAction as Action,
  EmployeeKPIGetAllDispose,
  EmployeeKPIGetAllError,
  EmployeeKPIGetAllRequest,
  EmployeeKPIGetAllSuccess,
} from '@kpi/store/actions';
import { UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      host: newHostAddress,
      method: 'get',
      path: `/v1/account/employees/kpis/assign?${params}`,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(EmployeeKPIGetAllDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* employeeKPISagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchSwitchAccess),
  ]);
}

export default employeeKPISagas;