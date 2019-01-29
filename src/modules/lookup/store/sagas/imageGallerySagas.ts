import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { 
  ImageGalleryAction as Action,
  imageGalleryGetAllError, 
  imageGalleryGetAllRequest, 
  imageGalleryGetAllSuccess, 
  imageGalleryGetByIdError,
  imageGalleryGetByIdRequest,
  imageGalleryGetByIdSuccess
} from '../actions';

function* watchFetchAllRequest() {
  const worker = (action: ReturnType<typeof imageGalleryGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/gallery/images?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(imageGalleryGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(imageGalleryGetAllError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(imageGalleryGetAllError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchFetchByIdRequest() {
  const worker = (action: ReturnType<typeof imageGalleryGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/gallery/images/${action.payload.imageUid
      }`,
      successEffects: (response: IApiResponse) => ([
        put(imageGalleryGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(imageGalleryGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(imageGalleryGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* imageGallerySagas() {
  yield all([
    fork(watchFetchAllRequest),
    fork(watchFetchByIdRequest),
  ]);
}

export default imageGallerySagas;