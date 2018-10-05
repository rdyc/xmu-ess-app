import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  ProjectAction as Action,
  projectGetAllError,
  projectGetAllRequest,
  projectGetAllSuccess,
  projectGetByIdError,
  projectGetByIdRequest,
  projectGetByIdSuccess,
  projectGetListError,
  projectGetListRequest,
  projectGetListSuccess,
  projectPostError,
  projectPostRequest,
  projectPostSuccess,
  projectPutError,
  projectPutRequest,
  projectPutSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

const flattenObject = (ob: any) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) { continue; }
    
    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) { continue; }
        
        toReturn[`${i}`] = flatObject[i] ? `${flatObject[i]}, ${flatObject[x]}` : flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${
        action.payload.positionUid
      }${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => [
        put(projectGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectGetAllError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectGetAllError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ],
      finallyEffects: [put(listBarLoading(false))]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/list${objectToQuerystring(
        action.payload.filter
      )}`,
      successEffects: (response: IApiResponse) => [
        put(projectGetListSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectGetListError(response.body)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectGetListError(error.message)),
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

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof projectGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations/${action.payload.companyUid}/${
        action.payload.positionUid
      }/${action.payload.projectUid}`,
      successEffects: (response: IApiResponse) => [
        put(projectGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectGetByIdError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectGetByIdError(error.message)),
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

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof projectPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/project/registrations/${action.payload.companyUid}/${
        action.payload.positionUid
      }`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectPostSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectPostError(response.statusText)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: response.statusText,
            details: response
          })
        )
      ],
      errorEffects: (error: TypeError) => [
        put(projectPostError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchPutFetchRequest() {
  const worker = (action: ReturnType<typeof projectPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/project/registrations/${action.payload.companyUid}/${
        action.payload.positionUid
      }/${action.payload.projectUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(projectPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve();
      },
      failureEffects: (response: IApiResponse) => [
        put(projectPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        if (response.status === 400) {
          const errors = flattenObject(response.body.errors);
          
          // action.payload.reject(new SubmissionError(response.body.errors));
          action.payload.reject(new SubmissionError(errors));
        } else {
          action.payload.reject(response.statusText);
        }
      },
      errorEffects: (error: TypeError) => [
        put(projectPostError(error.message)),
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

function* projectSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchListFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchPutFetchRequest)
  ]);
}

export default projectSagas;