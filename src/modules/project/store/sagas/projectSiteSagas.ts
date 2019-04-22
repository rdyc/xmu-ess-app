import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import {
  projectRegistrationGetByIdDispose,
  ProjectSiteAction as Action,
  projectSiteGetDispose,
  projectSiteGetError,
  projectSiteGetRequest,
  projectSiteGetSuccess,
  projectSitePatchError,
  projectSitePatchRequest,
  projectSitePatchSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetRequest() {
  const worker = (action: ReturnType<typeof projectSiteGetRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/sites/${action.payload.companyUid}/${action.payload.projectUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectSiteGetSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectSiteGetError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectSiteGetError(error.message))
      ],
      finallyEffects: [
        
      ]
    });
  };

  yield takeEvery(Action.GET_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof projectSitePatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/project/sites/${action.payload.companyUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectSiteGetDispose()),
        put(projectSitePatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectSitePatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(projectSitePatchError(error.message)),
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

  yield takeEvery(Action.PATCH_REQUEST, worker);
}

function* projectSiteSagas() {
  yield all([
    fork(watchGetRequest),
    fork(watchPatchRequest)
  ]);
}

export default projectSiteSagas;