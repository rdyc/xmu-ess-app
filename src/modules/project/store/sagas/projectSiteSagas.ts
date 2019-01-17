import { layoutAlertAdd } from '@layout/store/actions';
import {
  projectRegistrationGetByIdDispose,
  ProjectSiteAction as Action,
  projectSiteDeleteError,
  projectSiteDeleteRequest,
  projectSiteDeleteSuccess,
  projectSiteGetDispose,
  projectSiteGetError,
  projectSiteGetRequest,
  projectSiteGetSuccess,
  projectSitePostError,
  projectSitePostRequest,
  projectSitePostSuccess,
  projectSitePutError,
  projectSitePutRequest,
  projectSitePutSuccess,
} from '@project/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
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
        put(projectSiteGetError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectSiteGetError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [
        
      ]
    });
  };

  yield takeEvery(Action.GET_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof projectSitePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/sites/${action.payload.companyUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectSiteGetDispose()),
        put(projectSitePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectSitePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based form section name
            information: flattenObject(response.body.errors) 
          };

          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(projectSitePostError(error.message)),
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

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof projectSitePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/project/sites/${action.payload.companyUid}/${action.payload.projectUid}/${action.payload.siteUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectSiteGetDispose()),
        put(projectSitePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectSitePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(projectSitePutError(error.message)),
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

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof projectSiteDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/project/sites/${action.payload.companyUid}/${action.payload.projectUid}/${action.payload.siteUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectSiteGetDispose()),
        put(projectSiteDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectSiteDeleteError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors: any = { 
            // information -> based on form section name
            information: flattenObject(response.body.errors) 
          };
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(projectSiteDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* projectSiteSagas() {
  yield all([
    fork(watchGetRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default projectSiteSagas;