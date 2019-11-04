import {
  AccountEmployeeLeaveAction as Action,
  accountEmployeeLeaveGetByIdError,
  accountEmployeeLeaveGetByIdRequest,
  accountEmployeeLeaveGetByIdSuccess,
} from '@account/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeLeaveGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/${action.payload.year}/leaves?companyUid=${action.payload.companyUid}`,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeLeaveGetByIdSuccess(response.body)),
      ], 
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeLeaveGetByIdError(response)),
      ], 
      errorEffects: (error: TypeError) => [
        put(accountEmployeeLeaveGetByIdError(error.message)),
      ]
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* accountEmployeeLeaveSagas() {
  yield all([
    fork(watchByIdFetchRequest),
  ]);
}

export default accountEmployeeLeaveSagas;