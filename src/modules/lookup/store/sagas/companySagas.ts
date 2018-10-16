import { layoutAlertAdd, listBarMetadata } from '@layout/store/actions';
import {
  CompanyAction as Action,
  companyGetAllError,
  companyGetAllRequest,
  companyGetAllSuccess,
  companyGetByIdError,
  companyGetByIdRequest,
  companyGetByIdSuccess,
  companyGetListError,
  companyGetListRequest,
  companyGetListSuccess,
} from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse, objectToQuerystring } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof companyGetAllRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/companies${objectToQuerystring(action.payload.filter)}`, 
      success: (response: IApiResponse) => ([
        put(companyGetAllSuccess(response.body)),
        put(listBarMetadata(response.body.metadata))
      ]), 
      failed: (response: IApiResponse) => ([
        put(companyGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(companyGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof companyGetListRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/companies/list${objectToQuerystring(action.payload.filter)}`,
      success: (response: IApiResponse) => ([
        put(companyGetListSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(companyGetListError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(companyGetListError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      finally: () => ([])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof companyGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/companies/${action.payload.companyUid}`,
      success: (response: IApiResponse) => ([
        put(companyGetByIdSuccess(response.body)),
      ]), 
      failed: (response: IApiResponse) => ([
        put(companyGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      error: (error: TypeError) => ([
        put(companyGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ]),
      finally: () => ([])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* companySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest)
  ]);
}

export default companySagas;