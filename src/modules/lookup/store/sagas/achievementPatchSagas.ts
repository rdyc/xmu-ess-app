import { layoutAlertAdd } from '@layout/store/actions';
import { AchievementAction as Action, achievementPatchError, achievementPatchSuccess } from '@lookup/store/actions';
import { flattenObject } from '@utils/flattenObject';
import saiyanSaga from '@utils/saiyanSaga';
import { SubmissionError } from 'redux-form';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';
import { achievementPatchRequest } from '../actions';

function* watchPatchRequest() {
  const worker = (action: ReturnType<typeof achievementPatchRequest>) => {
    const data = new FormData();
      
    data.append('file', action.payload.data.file[0]);

    return saiyanSaga.fetch({
      method: 'patch',
      path: '/v1/achievements',
      payload: data,
      isJsonContent: false,
      successEffects: (response: IApiResponse) => [
        put(achievementPatchSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body);
      },
      failureEffects: (response: IApiResponse) => [
        put(achievementPatchError(response.statusText))
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
        put(achievementPatchError(error.message)),
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

function* achievementPatchSagas() {
  yield all([
    fork(watchPatchRequest)
  ]);
}

export default achievementPatchSagas;