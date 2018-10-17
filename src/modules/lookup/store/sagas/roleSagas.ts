import { layoutAlertAdd, listBarMetadata } from '@layout/store/actions';
import {
  RoleAction as Action,
  roleGetAllError,
  roleGetAllRequest,
  roleGetAllSuccess,
  roleGetByIdError,
  roleGetByIdRequest,
  roleGetByIdSuccess,
  roleGetListError,
  roleGetListRequest,
  roleGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof roleGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/roles${objectToQuerystring(action.payload.filter)}`, 
      successEffects: (response: IApiResponse) => ([
        put(roleGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(roleGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(roleGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof roleGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/roles/list${objectToQuerystring(action.payload.filter)}`,
      successEffects: (response: IApiResponse) => ([
        put(roleGetListSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(roleGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(roleGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof roleGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/roles/${action.payload.companyUid}/${action.payload.roleUid}`,
      successEffects: (response: IApiResponse) => ([
        put(roleGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(roleGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(roleGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* lookupRoleSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest)
  ]);
}

export default lookupRoleSagas;