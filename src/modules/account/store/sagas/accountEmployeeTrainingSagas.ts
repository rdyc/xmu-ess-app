import {
  AccountEmployeeTrainingAction as Action,
  accountEmployeeTrainingDeleteError,
  accountEmployeeTrainingDeleteRequest,
  accountEmployeeTrainingDeleteSuccess,
  accountEmployeeTrainingGetAllDispose,
  accountEmployeeTrainingGetAllError,
  accountEmployeeTrainingGetAllRequest,
  accountEmployeeTrainingGetAllSuccess,
  accountEmployeeTrainingGetByIdDispose,
  accountEmployeeTrainingGetByIdError,
  accountEmployeeTrainingGetByIdRequest,
  accountEmployeeTrainingGetByIdSuccess,
  accountEmployeeTrainingGetListError,
  accountEmployeeTrainingGetListRequest,
  accountEmployeeTrainingGetListSuccess,
  accountEmployeeTrainingPostError,
  accountEmployeeTrainingPostRequest,
  accountEmployeeTrainingPostSuccess,
  accountEmployeeTrainingPutError,
  accountEmployeeTrainingPutRequest,
  accountEmployeeTrainingPutSuccess,
} from '@account/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchAllRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings?${params}`, 
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetAllSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetAllError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeTrainingGetAllError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchListRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });
    
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings/list?${params}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetListSuccess(response.body))
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetListError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeTrainingGetListError(error.message)),
      ])
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchByIdRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'GET',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings/${action.payload.trainingUid}`,
      successEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetByIdSuccess(response.body)),
      ]), 
      failureEffects: (response: IApiResponse) => ([
        put(accountEmployeeTrainingGetByIdError(response)),
      ]), 
      errorEffects: (error: TypeError) => ([
        put(accountEmployeeTrainingGetByIdError(error.message)),
      ])
    });
  };
  
  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'POST',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingGetByIdDispose()),
        put(accountEmployeeTrainingGetAllDispose()),
        put(accountEmployeeTrainingPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeTrainingPostError(error.message)),
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

function* watchPutRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'PUT',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingGetByIdDispose()),
        put(accountEmployeeTrainingGetAllDispose()),
        put(accountEmployeeTrainingPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeTrainingPutError(error.message)),
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

  yield takeEvery(Action.PUT_REQUEST, worker);
}

function* watchDeleteRequest() {
  const worker = (action: ReturnType<typeof accountEmployeeTrainingDeleteRequest>) => {
    return saiyanSaga.fetch({
      method: 'DELETE',
      path: `/v1/account/employees/${action.payload.employeeUid}/trainings`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingGetAllDispose()),
        put(accountEmployeeTrainingDeleteSuccess(response.body)),
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(accountEmployeeTrainingDeleteError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(accountEmployeeTrainingDeleteError(error.message)),
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

  yield takeEvery(Action.DELETE_REQUEST, worker);
}

function* accountEmployeeTrainingSagas() {
  yield all([
    fork(watchAllRequest),
    fork(watchListRequest),
    fork(watchByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchDeleteRequest)
  ]);
}

export default accountEmployeeTrainingSagas;