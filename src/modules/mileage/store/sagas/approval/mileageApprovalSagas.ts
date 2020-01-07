import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  MileageApprovalAction as Action,
  mileageApprovalGetAllDispose,
  mileageApprovalGetAllError,
  mileageApprovalGetAllRequest,
  mileageApprovalGetAllSuccess,
  mileageApprovalGetByIdDispose,
  mileageApprovalGetByIdError,
  mileageApprovalGetByIdRequest,
  mileageApprovalGetByIdSuccess,
  mileageApprovalPostError,
  mileageApprovalPostRequest,
  mileageApprovalPostSuccess,
} from '@mileage/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/mileage?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalGetAllError(error.message)),
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalGetByIdError(error.message))
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof mileageApprovalPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/approvals/mileage/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(mileageApprovalGetAllDispose()),
        put(mileageApprovalGetByIdDispose()),
        put(mileageApprovalPostSuccess(response.body))
      ]), 
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => ([
        put(mileageApprovalPostError(response.statusText)),
      ]),
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => ([
        put(mileageApprovalPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ]),
      errorCallback: (error: any) => {
        action.payload.reject(error);
      }
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(mileageApprovalGetAllDispose()),
      put(mileageApprovalGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* mileageApprovalSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default mileageApprovalSagas;