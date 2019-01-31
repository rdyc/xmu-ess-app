import { layoutAlertAdd } from '@layout/store/actions';
import {
  LookupVersionAction as Action,
  lookupVersionGetByIdDispose,
  lookupVersionGetByIdError,
  lookupVersionGetByIdRequest,
  lookupVersionGetByIdSuccess,
  lookupVersionPatchError,
  lookupVersionPatchRequest,
  lookupVersionPatchSuccess,
} from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof lookupVersionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/version/${action.payload.clientId}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupVersionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupVersionGetByIdError(response.statusText)),
        put(layoutAlertAdd({
          time: new Date(),
          message: response.statusText,
          details: response
        }))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupVersionGetByIdError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message,
        }))
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof lookupVersionPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/version/${action.payload.clientId}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(lookupVersionPatchSuccess(response.body)),
        put(lookupVersionGetByIdDispose())
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupVersionPatchError(response.statusText))
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
        put(lookupVersionPatchError(error.message)),
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

function* lookupVersionSagas() {
  yield all([
    fork(watchGetByIdRequest),
    fork(watchPatchRequest)
  ]);
}

export default lookupVersionSagas;