import {
  DocumentPresalesAction as Action,
  documentPresalesGetAllError,
  documentPresalesGetAllRequest,
  documentPresalesGetAllSuccess,
  documentPresalesGetByIdError,
  documentPresalesGetByIdRequest,
  documentPresalesGetByIdSuccess,
  documentPresalesGetListError,
  documentPresalesGetListRequest,
  documentPresalesGetListSuccess,
} from '@common/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof documentPresalesGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(documentPresalesGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(documentPresalesGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(documentPresalesGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchListRequest() {
  const worker = (action: ReturnType<typeof documentPresalesGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(documentPresalesGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(documentPresalesGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(documentPresalesGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof documentPresalesGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/common/types/${action.payload.category}/${action.payload.id}`,
      successEffects: (response: IApiResponse) => ([
        put(documentPresalesGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(documentPresalesGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(documentPresalesGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* commonDocumentPresalesSagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchListRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default commonDocumentPresalesSagas;