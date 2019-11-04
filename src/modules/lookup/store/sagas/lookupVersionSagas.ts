import { handleResponse } from '@layout/helper/handleResponse';
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
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof lookupVersionGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/version/${action.payload.clientId}`,
      successEffects: (response: IApiResponse) => ([
        put(lookupVersionGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(lookupVersionGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(lookupVersionGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof lookupVersionPatchRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
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
        const result = handleResponse(response);
        
        action.payload.reject(result);
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