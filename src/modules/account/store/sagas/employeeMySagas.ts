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
      success: (response: IApiResponse) => ([
        put(EmployeeFetchSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(EmployeeFetchError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(EmployeeFetchError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
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