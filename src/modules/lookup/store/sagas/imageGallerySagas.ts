import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { 
  ImageGalleryAction as Action,
  imageGalleryGetAllDispose, 
  imageGalleryGetAllError, 
  imageGalleryGetAllRequest, 
  imageGalleryGetAllSuccess,
  imageGalleryGetByIdDispose,
  imageGalleryGetByIdError,
  imageGalleryGetByIdRequest,
  imageGalleryGetByIdSuccess,
  imageGalleryPostError,
  imageGalleryPostRequest,
  imageGalleryPostSuccess
} from '../actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof imageGalleryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/gallery?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(imageGalleryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(imageGalleryGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(imageGalleryGetAllError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof imageGalleryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/lookup/gallery/${action.payload.imageUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(imageGalleryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(imageGalleryGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(imageGalleryGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof imageGalleryPostRequest>) => {
    const data = new FormData();

    data.append('file', action.payload.data.file[0]);

    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/lookup/gallery/`,
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(imageGalleryGetByIdDispose()),
        put(imageGalleryGetAllDispose()),
        put(imageGalleryPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(imageGalleryPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(imageGalleryPostError(error.message)),
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

function* imageGallerySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
    fork(watchPostRequest)
  ]);
}

export default imageGallerySagas;