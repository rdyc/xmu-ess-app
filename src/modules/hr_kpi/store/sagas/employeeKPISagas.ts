import {
  EmployeeKPIAction as Action,
  EmployeeKPIGetAllDispose,
  EmployeeKPIGetAllError,
  EmployeeKPIGetAllRequest,
  EmployeeKPIGetAllSuccess,
  EmployeeKPIGetByIdDispose,
  EmployeeKPIGetByIdError,
  EmployeeKPIGetByIdRequest,
  EmployeeKPIGetByIdSuccess,
  EmployeeKPIGetItemListDispose,
  EmployeeKPIGetItemListError,
  EmployeeKPIGetItemListRequest,
  EmployeeKPIGetItemListSuccess,
  EmployeeKPIPostBulkError,
  EmployeeKPIPostBulkRequest,
  EmployeeKPIPostBulkSuccess,
  EmployeeKPIPostError,
  EmployeeKPIPostRequest,
  EmployeeKPIPostSuccess,
  EmployeeKPIPutError,
  EmployeeKPIPutFinalError,
  EmployeeKPIPutFinalRequest,
  EmployeeKPIPutFinalSuccess,
  EmployeeKPIPutItemBulkError,
  EmployeeKPIPutItemBulkRequest,
  EmployeeKPIPutItemBulkSuccess,
  EmployeeKPIPutRequest,
  EmployeeKPIPutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/employees/${action.payload.employeeUid}?${params}`,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetItemListRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIGetItemListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/employees?${params}`,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetItemListSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetItemListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIGetItemListError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ITEM_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}`,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIPostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/employees/${action.payload.employeeUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdDispose()),
        put(EmployeeKPIGetAllDispose()),
        put(EmployeeKPIGetItemListDispose()),
        put(EmployeeKPIPostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIPostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIPostError(error.message)),
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

function* watchPostBulkRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIPostBulkRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/employees`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdDispose()),
        put(EmployeeKPIGetAllDispose()),
        put(EmployeeKPIGetItemListDispose()),
        put(EmployeeKPIPostBulkSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIPostBulkError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIPostBulkError(error.message)),
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
  const worker = (action: ReturnType<typeof EmployeeKPIPutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdDispose()),
        put(EmployeeKPIGetAllDispose()),
        put(EmployeeKPIPutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIPutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIPutError(error.message)),
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

function* watchPutItemBulkRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIPutItemBulkRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/employees`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdDispose()),
        put(EmployeeKPIGetAllDispose()),
        put(EmployeeKPIGetItemListDispose()),
        put(EmployeeKPIPutItemBulkSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIPutItemBulkError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIPutItemBulkError(error.message)),
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

  yield takeEvery(Action.PUT_ITEM_BULK_REQUEST, worker);
}

function* watchPutFinalRequest() {
  const worker = (action: ReturnType<typeof EmployeeKPIPutFinalRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/employees/${action.payload.employeeUid}/${action.payload.kpiUid}/final`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(EmployeeKPIGetByIdDispose()),
        put(EmployeeKPIGetAllDispose()),
        put(EmployeeKPIGetItemListDispose()),
        put(EmployeeKPIPutFinalSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(EmployeeKPIPutFinalError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(EmployeeKPIPutFinalError(error.message)),
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

  yield takeEvery(Action.PUT_FINAL_REQUEST, worker);
}

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(EmployeeKPIGetAllDispose()),
      put(EmployeeKPIGetByIdDispose()),
      put(EmployeeKPIGetItemListDispose()),
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* employeeKPISagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetItemListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPostBulkRequest),
    fork(watchPutRequest),
    fork(watchPutItemBulkRequest),
    fork(watchPutFinalRequest),
    fork(watchSwitchAccess),
  ]);
}

export default employeeKPISagas;