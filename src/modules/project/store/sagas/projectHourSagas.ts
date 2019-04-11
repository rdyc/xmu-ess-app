import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  ProjectHourAction as Action,
  projectHourPutError,
  projectHourPutRequest,
  projectHourPutSuccess,
  projectRegistrationGetAllDispose,
  projectRegistrationGetByIdDispose,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof projectHourPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}/hour`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationGetByIdDispose()),
        put(projectHourPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectHourPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectHourPutError(error.message)),
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

function* projectHourSagas() {
  yield all([
    fork(watchPutRequest)
  ]);
}

export default projectHourSagas;