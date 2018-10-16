import {
  EmployeeProfileAction as Action,
  EmployeeProfileCommandError,
  EmployeeProfileCommandRequest,
  EmployeeProfileCommandSuccess,
  EmployeeProfileFetchError,
  EmployeeProfileFetchRequest,
  EmployeeProfileFetchSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchRequest() {
  const worker = (action: ReturnType<typeof EmployeeProfileFetchRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/${action.payload.uid}`,
      successEffects: (response: IApiResponse) => ([
        put(EmployeeProfileFetchSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(EmployeeProfileFetchError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(EmployeeProfileFetchError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.FETCH_REQUEST, worker);
}

function* watchCommandRequest() {
  const worker = (action: ReturnType<typeof EmployeeProfileCommandRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/account/employees/${action.payload.uid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => ([
        put(EmployeeProfileCommandSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(EmployeeProfileCommandError(response.statusText)),
        put(layoutAlertAdd({ time: new Date(), message: response.body }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(EmployeeProfileCommandError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.COMMAND_REQUEST, worker);
}

function* employeeProfileSagas() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCommandRequest)
  ]);
}

export default employeeProfileSagas;