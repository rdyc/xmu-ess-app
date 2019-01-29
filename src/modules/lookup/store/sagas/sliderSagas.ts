import { layoutAlertAdd } from '@layout/store/actions';
import {
  SliderAction as Action,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { sliderGetDispose, sliderGetError, sliderGetRequest, sliderGetSuccess, sliderPatchError, sliderPatchRequest, sliderPatchSuccess } from '../actions/sliderActions';

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof sliderGetRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/gallery/slider`,
      successEffects: (response: IApiResponse) => [
        put(sliderGetSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(sliderGetError(response.body)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ],
      errorEffects: (error: TypeError) => [
        put(sliderGetError(error.message)),
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
  const worker = (action: ReturnType<typeof sliderPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'patch',
      path: `/v1/gallery/slider`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(sliderGetDispose()),
        put(sliderPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(sliderPatchError(response.statusText))
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
        put(sliderPatchError(error.message)),
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

function* sliderSagas() {
  yield all([
    fork(watchGetListRequest),
    fork(watchPatchRequest)
  ]);
}

export default sliderSagas;