import { UserAction } from '@layout/store/actions';
import {
  ProjectAdministrationAction as Action,
  projectAdministrationGetAllDispose,
  projectAdministrationGetAllError,
  projectAdministrationGetAllRequest,
  projectAdministrationGetAllSuccess,
} from '@project/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof projectAdministrationGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/project/registrations?companyUid=${action.payload.companyUid}${params.length !== 0 ? '&' : '' }${params}`,
      successEffects: (response: IApiResponse) => [
        put(projectAdministrationGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(projectAdministrationGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(projectAdministrationGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(projectAdministrationGetAllDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* projectAdministrationSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchSwitchAccess)
  ]);
}

export default projectAdministrationSagas;