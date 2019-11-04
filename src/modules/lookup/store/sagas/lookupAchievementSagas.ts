import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import { LookupAchievementAction as Action, lookupAchievementPatchError, lookupAchievementPatchSuccess } from '@lookup/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { lookupAchievementPatchRequest } from '../actions';

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof lookupAchievementPatchRequest>) => {
    const data = new FormData();
      
    data.append('file', action.payload.data.file[0]);

    return saiyanSaga.fetch({
      method: 'PATCH',
      path: '/v1/achievements',
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(lookupAchievementPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body);
      },
      failureEffects: (response: IApiResponse) => [
        put(lookupAchievementPatchError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(lookupAchievementPatchError(error.message)),
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

function* lookupAchievementSagas() {
  yield all([
    fork(watchPatchRequest)
  ]);
}

export default lookupAchievementSagas;