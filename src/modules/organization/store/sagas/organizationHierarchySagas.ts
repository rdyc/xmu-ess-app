import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  OrganizationHierarchyAction as Action,
  organizationHierarchyDeleteError,
  organizationHierarchyDeleteRequest,
  organizationHierarchyDeleteSuccess,
  organizationHierarchyGetAllDispose,
  organizationHierarchyGetAllError,
  organizationHierarchyGetAllRequest,
  organizationHierarchyGetAllSuccess,
  organizationHierarchyGetByIdError,
  organizationHierarchyGetByIdRequest,
  organizationHierarchyGetByIdSuccess,
  organizationHierarchyGetListError,
  organizationHierarchyGetListRequest,
  organizationHierarchyGetListSuccess,
  organizationHierarchyPostError,
  organizationHierarchyPostRequest,
  organizationHierarchyPostSuccess,
  organizationHierarchyPutError,
  organizationHierarchyPutRequest,
  organizationHierarchyPutSuccess,
} from '@organization/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof organizationHierarchyGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/hierarchies?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationHierarchyGetAllError(error.message)),
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof organizationHierarchyGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/hierarchies/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationHierarchyGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof organizationHierarchyGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/organization/hierarchies/${action.payload.companyUid}/${action.payload.hierarchyUid}`,
      successEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationHierarchyGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationHierarchyGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof organizationHierarchyPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/organization/hierarchies/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationHierarchyGetAllDispose()),
        put(organizationHierarchyPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationHierarchyPostError(response.statusText))
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
        put(organizationHierarchyPostError(error.message)),
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
  const worker = (action: ReturnType<typeof organizationHierarchyPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/organization/hierarchies/${action.payload.companyUid}/${action.payload.hierarchyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationHierarchyGetAllDispose()),
        put(organizationHierarchyPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationHierarchyPutError(response.statusText))
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
        put(organizationHierarchyPutError(error.message)),
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
  const worker = (action: ReturnType<typeof organizationHierarchyDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'delete',
      path: `/v1/organization/hierarchies`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationHierarchyGetAllDispose()),
        put(organizationHierarchyDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationHierarchyDeleteError(response.statusText))
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
        put(organizationHierarchyDeleteError(error.message)),
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

function* organizationHierarchySagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default organizationHierarchySagas;