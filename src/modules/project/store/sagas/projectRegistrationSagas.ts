import { layoutAlertAdd } from '@layout/store/actions';
import {
  ProjectRegistrationAction as Action,
  projectRegistrationGetAllDispose,
  projectRegistrationGetAllError,
  projectRegistrationGetAllRequest,
  projectRegistrationGetAllSuccess,
  projectRegistrationGetByIdDispose,
  projectRegistrationGetByIdError,
  projectRegistrationGetByIdRequest,
  projectRegistrationGetByIdSuccess,
  projectRegistrationGetListError,
  projectRegistrationGetListRequest,
  projectRegistrationGetListSuccess,
  projectRegistrationPatchError,
  projectRegistrationPatchRequest,
  projectRegistrationPatchSuccess,
  projectRegistrationPostError,
  projectRegistrationPostRequest,
  projectRegistrationPostSuccess,
  projectRegistrationPutError,
  projectRegistrationPutRequest,
  projectRegistrationPutSuccess,
} from '@project/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectRegistrationGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectRegistrationGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof projectRegistrationGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetListSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationGetListError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ],
      errorEffects: (error: TypeError) => [
        put(projectRegistrationGetListError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof projectRegistrationGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectRegistrationGetByIdError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof projectRegistrationPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationPostError(response.statusText))
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
        put(projectRegistrationPostError(error.message)),
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
  const worker = (action: ReturnType<typeof projectRegistrationPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationPutError(response.statusText))
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
        put(projectRegistrationPutError(error.message)),
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

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof projectRegistrationPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/project/registrations/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectRegistrationGetByIdDispose()),
        put(projectRegistrationGetAllDispose()),
        put(projectRegistrationPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(projectRegistrationPatchError(response.statusText))
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
        put(projectRegistrationPatchError(error.message)),
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

function* projectRegistrationSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchPatchRequest)
  ]);
}

export default projectRegistrationSagas;