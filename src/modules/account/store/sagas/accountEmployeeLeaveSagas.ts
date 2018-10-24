import {
  AccountEmployeeLeaveAction as Action,
  accountEmployeeLeaveGetByIdError,
  accountEmployeeLeaveGetByIdRequest,
  accountEmployeeLeaveGetByIdSuccess,
} from '@account/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeLeaveGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/account/employees/leaves/${action.payload.employeeUid}/${action.payload.year}/${action.payload.companyUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeLeaveGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeLeaveGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeLeaveGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeLeaveSagas() {
  yield all([
    fork(watchByIdRequest),
  ]);
}

export default accountEmployeeLeaveSagas;