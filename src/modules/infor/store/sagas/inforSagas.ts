import { InforAction as Action, inforPostError, inforPostSuccess } from '@infor/store/actions';
import { layoutAlertAdd } from '@layout/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

import { inforPostRequest } from '../actions';

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof inforPostRequest>) => {
    const data = new FormData();
      
    data.append('file', action.payload.data.file[0]);

    return saiyanSaga.fetch({
      method: 'post',
      path: '/v1/infor/reports',
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(inforPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body);
      },
      failureEffects: (response: IApiResponse) => [
        put(inforPostError(response.statusText))
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
        put(inforPostError(error.message)),
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

function* inforSagas() {
  yield all([
    fork(watchPostRequest)
  ]);
}

export default inforSagas;