import { EmployeeFetchError, EmployeeFetchSuccess, EmployeeMyAction as Action } from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchRequest() {
  const worker = () => {
    return saiyanSaga.fetch({
      method: 'get',
      path: '/v1/account/employees/my',
      successEffects: (response: IApiResponse) => ([
        put(EmployeeFetchSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(EmployeeFetchError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(EmployeeFetchError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.FETCH_REQUEST, worker);
}

function* employeeMySagas() {
  yield all([
    fork(watchFetchRequest)
  ]);
}

export default employeeMySagas;