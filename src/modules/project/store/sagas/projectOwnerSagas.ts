import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  ProjectOwnerAction as Action,
  projectOwnerPutError,
  projectOwnerPutRequest,
  projectOwnerPutSuccess,
  projectRegistrationGetAllDispose,
  projectRegistrationGetByIdDispose,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof projectOwnerPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}/owner`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationGetByIdDispose()),
        put(projectOwnerPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectOwnerPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectOwnerPutError(error.message)),
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

function* projectOwnerSagas() {
  yield all([
    fork(watchPutRequest)
  ]);
}

export default projectOwnerSagas;