import {
  AccountEmployeeMyAction as Action,
  accountEmployeeMyGetError,
  accountEmployeeMyGetSuccess,
} from '@account/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetRequest() {
  const worker = () => {
    return saiyanSaga.fetch({
      method: 'get',
      path: '/v1/account/employees/my',
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeMyGetSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeMyGetError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeMyGetError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_REQUEST, worker);
}

function* accountEmployeeMySagas() {
  yield all([
    fork(watchGetRequest)
  ]);
}

export default accountEmployeeMySagas;