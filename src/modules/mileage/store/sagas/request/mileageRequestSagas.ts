import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import {
  MileageRequestAction as Action,
  mileageRequestGetAllDispose,
  mileageRequestGetAllError,
  mileageRequestGetAllRequest,
  mileageRequestGetAllSuccess,
  mileageRequestGetByIdDispose,
  mileageRequestGetByIdError,
  mileageRequestGetByIdRequest,
  mileageRequestGetByIdSuccess,
  mileageRequestPostError,
  mileageRequestPostRequest,
  mileageRequestPostSuccess,
} from '@mileage/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllFetchRequest() {
  const worker = (action: ReturnType<typeof mileageRequestGetAllRequest>) => { 
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/mileage/requests?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageRequestGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageRequestGetAllError(response))
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageRequestGetAllError(error.message))
      ]),
      finallyEffects: [
        // nothing
      ]
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchByIdFetchRequest() {
  const worker = (action: ReturnType<typeof mileageRequestGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/mileage/requests/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.mileageUid}`, 
      successEffects: (response: IApiResponse) => ([
        put(mileageRequestGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(mileageRequestGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(mileageRequestGetByIdError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostFetchRequest() {
  const worker = (action: ReturnType<typeof mileageRequestPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/mileage/requests/${action.payload.companyUid}/${action.payload.positionUid}`, 
      payload: action.payload.data, 
      successEffects: (response: IApiResponse) => ([
        put(mileageRequestGetByIdDispose()),
        put(mileageRequestGetAllDispose()),
        put(mileageRequestPostSuccess(response.body))
      ]),
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(mileageRequestPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      }, 
      errorEffects: (error: TypeError) => ([
        put(mileageRequestPostError(error.message)),
        put(layoutAlertAdd({
          time: new Date(),
          message: error.message
        }))
      ])
    });
  };

  yield takeEvery(Action.POST_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(mileageRequestGetAllDispose()),
      put(mileageRequestGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* mileageRequestSagas() {
  yield all([
    fork(watchAllFetchRequest),
    fork(watchByIdFetchRequest),
    fork(watchPostFetchRequest),
    fork(watchSwitchAccess)
  ]);
}

export default mileageRequestSagas;