import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  OrganizationWorkflowAction as Action,
  organizationWorkflowDeleteError,
  organizationWorkflowDeleteRequest,
  organizationWorkflowDeleteSuccess,
  organizationWorkflowGetAllDispose,
  organizationWorkflowGetAllError,
  organizationWorkflowGetAllRequest,
  organizationWorkflowGetAllSuccess,
  organizationWorkflowGetByIdError,
  organizationWorkflowGetByIdRequest,
  organizationWorkflowGetByIdSuccess,
  organizationWorkflowGetListError,
  organizationWorkflowGetListRequest,
  organizationWorkflowGetListSuccess,
  organizationWorkflowPostError,
  organizationWorkflowPostRequest,
  organizationWorkflowPostSuccess,
  organizationWorkflowPutError,
  organizationWorkflowPutRequest,
  organizationWorkflowPutSuccess,
} from '@organization/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof organizationWorkflowGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/workflows${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationWorkflowGetAllError(error.message)),
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof organizationWorkflowGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/workflows/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetListError(response.statusText)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationWorkflowGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof organizationWorkflowGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/workflows/${action.payload.companyUid}/${action.payload.menuUid}/${action.payload.workflowUid}`,
      successEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationWorkflowGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationWorkflowGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof organizationWorkflowPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/organization/workflows/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationWorkflowGetAllDispose()),
        put(organizationWorkflowPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationWorkflowPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationWorkflowPostError(error.message)),
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
  const worker = (action: ReturnType<typeof organizationWorkflowPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/organization/workflows/${action.payload.companyUid}/${action.payload.menuUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationWorkflowGetAllDispose()),
        put(organizationWorkflowPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationWorkflowPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationWorkflowPutError(error.message)),
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
  const worker = (action: ReturnType<typeof organizationWorkflowDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/organization/workflows`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationWorkflowGetAllDispose()),
        put(organizationWorkflowDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationWorkflowDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationWorkflowDeleteError(error.message)),
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

function* organizationWorkflowSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default organizationWorkflowSagas;