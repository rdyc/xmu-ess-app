import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { 
  ImageGalleryAction as Action,
  lookupImageGalleryGetAllDispose, 
  lookupImageGalleryGetAllError, 
  lookupImageGalleryGetAllRequest, 
  lookupImageGalleryGetAllSuccess,
  lookupImageGalleryGetByIdDispose,
  lookupImageGalleryGetByIdError,
  lookupImageGalleryGetByIdRequest,
  lookupImageGalleryGetByIdSuccess,
  lookupImageGalleryPostError,
  lookupImageGalleryPostRequest,
  lookupImageGalleryPostSuccess
} from '../actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof lookupImageGalleryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/gallery?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(lookupImageGalleryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupImageGalleryGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupImageGalleryGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof lookupImageGalleryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/gallery/${action.payload.imageUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(lookupImageGalleryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupImageGalleryGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupImageGalleryGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof lookupImageGalleryPostRequest>) => {
    const data = new FormData();

    data.append('file', action.payload.data.file[0]);

    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/gallery/`,
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(lookupImageGalleryGetByIdDispose()),
        put(lookupImageGalleryGetAllDispose()),
        put(lookupImageGalleryPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupImageGalleryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupImageGalleryPostError(error.message)),
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

function* lookupImageGallerySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest)
  ]);
}

export default lookupImageGallerySagas;