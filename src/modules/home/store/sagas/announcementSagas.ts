import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import { handleResponse } from '@layout/helper/handleResponse';
import {
  AnnouncementAction as Action,
  announcementGetDispose,
  announcementGetError,
  announcementGetSuccess,
  announcementPatchError,
  announcementPatchRequest,
  announcementPatchSuccess,
} from '../actions/announcementActions';

function* watchAllFetchRequest() {
  const worker = () => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/announcement/slider`,
      successEffects: (response: IApiResponse) => [
        put(announcementGetSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(announcementGetError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ],
      errorEffects: (error: TypeError) => [
        put(announcementGetError(error.message)),
        put(
          layoutAlertAdd({
            time: new Date(),
            message: error.message
          })
        )
      ]
    });
  };

  yield takeEvery(Action.GET_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof announcementPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/announcement/slider`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(announcementGetDispose()),
        put(announcementPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(announcementPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(announcementPatchError(error.message)),
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

  yield takeEvery(Action.PATCH_REQUEST, worker);
}

function* announcementSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchPatchRequest),
  ]);
}

export default announcementSagas;