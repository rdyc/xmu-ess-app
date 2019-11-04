import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  projectRegistrationGetAllDispose,
  projectRegistrationGetByIdDispose,
  ProjectStatusAction as Action,
  projectStatusPutError,
  projectStatusPutRequest,
  projectStatusPutSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof projectStatusPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}/status`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationGetByIdDispose()),
        put(projectStatusPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectStatusPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectStatusPutError(error.message)),
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

function* projectStatusSagas() {
  yield all([
    fork(watchPutRequest)
  ]);
}

export default projectStatusSagas;