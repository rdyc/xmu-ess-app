import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, listBarLoading, listBarMetadata } from '@layout/store/actions';
import {
  OrganizationStructureAction as Action,
  organizationStructureDeleteError,
  organizationStructureDeleteRequest,
  organizationStructureDeleteSuccess,
  organizationStructureGetAllDispose,
  organizationStructureGetAllError,
  organizationStructureGetAllRequest,
  organizationStructureGetAllSuccess,
  organizationStructureGetByIdError,
  organizationStructureGetByIdRequest,
  organizationStructureGetByIdSuccess,
  organizationStructureGetSubOrdinateListError,
  organizationStructureGetSubOrdinateListRequest,
  organizationStructureGetSubOrdinateListSuccess,
  organizationStructureGetSubOrdinateTreeKPIFinalError,
  organizationStructureGetSubOrdinateTreeKPIFinalRequest,
  organizationStructureGetSubOrdinateTreeKPIFinalSuccess,
  organizationStructurePostError,
  organizationStructurePostRequest,
  organizationStructurePostSuccess,
  organizationStructurePutError,
  organizationStructurePutRequest,
  organizationStructurePutSuccess,
} from '@organization/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof organizationStructureGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/organization/structures?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(organizationStructureGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationStructureGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationStructureGetAllError(error.message)),
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_ALL_STRUCTURE_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof organizationStructureGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/organization/structures/${action.payload.companyUid}/${action.payload.structureUid}`,
      successEffects: (response: IApiResponse) => ([
        put(organizationStructureGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationStructureGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationStructureGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_STRUCTURE_REQUEST, worker);
}

function* watchGetSubOrdinateListRequest() {
  const worker = (action: ReturnType<typeof organizationStructureGetSubOrdinateListRequest>) => {
    const params = qs.stringify(action.payload.filter, {
      allowDots: true,
      skipNulls: true
    });
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/organization/structures/subordinatelist?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(organizationStructureGetSubOrdinateListSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationStructureGetSubOrdinateListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationStructureGetSubOrdinateListError(error.message)),
      ]),
      finallyEffects: [put(listBarLoading(false))]
    });
  };
  
  yield takeEvery(Action.GET_SUBORDINATE_LIST_STRUCTURE_REQUEST, worker);
}

function* watchGetSubOrdinateTreeKPIFinalRequest() {
  const worker = (action: ReturnType<typeof organizationStructureGetSubOrdinateTreeKPIFinalRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true,
      indices: false
    });
    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/organization/structures/subordinatetreekpifinal/${action.payload.companyUid}/${action.payload.positionUid}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(organizationStructureGetSubOrdinateTreeKPIFinalSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(organizationStructureGetSubOrdinateTreeKPIFinalError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(organizationStructureGetSubOrdinateTreeKPIFinalError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_SUBORDINATE_TREE_KPIFINAL_STRUCTURE_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof organizationStructurePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/organization/structures/${action.payload.companyUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationStructureGetAllDispose()),
        put(organizationStructurePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationStructurePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationStructurePostError(error.message)),
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

  yield takeEvery(Action.POST_STRUCTURE_REQUEST, worker);
}

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof organizationStructurePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/organization/structures/${action.payload.companyUid}/${action.payload.structureUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationStructureGetAllDispose()),
        put(organizationStructurePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationStructurePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationStructurePutError(error.message)),
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

  yield takeEvery(Action.PUT_STRUCTURE_REQUEST, worker);
}

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof organizationStructureDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/organization/structures`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(organizationStructureGetAllDispose()),
        put(organizationStructureDeleteSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(organizationStructureDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(organizationStructureDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_STRUCTURE_REQUEST, worker);
}

function* organizationStructureSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetSubOrdinateListRequest),
    fork(watchGetSubOrdinateTreeKPIFinalRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default organizationStructureSagas;