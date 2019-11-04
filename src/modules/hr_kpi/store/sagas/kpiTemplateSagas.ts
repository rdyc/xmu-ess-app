
import {
  KPITemplateAction as Action,
  KPITemplateGetAllDispose,
  KPITemplateGetAllError,
  KPITemplateGetAllRequest,
  KPITemplateGetAllSuccess,
  KPITemplateGetByIdDispose,
  KPITemplateGetByIdError,
  KPITemplateGetByIdRequest,
  KPITemplateGetByIdSuccess,
  KPITemplateGetListDispose,
  KPITemplateGetListError,
  KPITemplateGetListRequest,
  KPITemplateGetListSuccess,
  KPITemplatePostError,
  KPITemplatePostRequest,
  KPITemplatePostSuccess,
  KPITemplatePutError,
  KPITemplatePutRequest,
  KPITemplatePutSuccess,
} from '@kpi/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof KPITemplateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/hr/kpi/templates?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPITemplateGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPITemplateGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPITemplateGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetListRequest() {
  const worker = (action: ReturnType<typeof KPITemplateGetListRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/hr/kpi/templates/list?${params}`,
      successEffects: (response: IApiResponse) => [
        put(KPITemplateGetListSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPITemplateGetListError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPITemplateGetListError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_LIST_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof KPITemplateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'GET',
      path: `/v1/hr/kpi/templates/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.templateUid}`,
      successEffects: (response: IApiResponse) => [
        put(KPITemplateGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(KPITemplateGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(KPITemplateGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof KPITemplatePostRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'POST',
      path: `/v1/hr/kpi/templates/${action.payload.companyUid}/${action.payload.positionUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPITemplateGetByIdDispose()),
        put(KPITemplateGetAllDispose()),
        put(KPITemplatePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPITemplatePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPITemplatePostError(error.message)),
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
  const worker = (action: ReturnType<typeof KPITemplatePutRequest>) => {
    return saiyanSaga.fetch({
      
      method: 'PUT',
      path: `/v1/hr/kpi/templates/${action.payload.companyUid}/${action.payload.positionUid}/${action.payload.templateUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(KPITemplateGetByIdDispose()),
        put(KPITemplateGetAllDispose()),
        put(KPITemplatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(KPITemplatePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(KPITemplatePutError(error.message)),
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

function* watchSwitchAccess() {
  function* worker() { 
    yield all([
      put(KPITemplateGetAllDispose()),
      put(KPITemplateGetListDispose()),
      put(KPITemplateGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* kpiTemplateSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetListRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default kpiTemplateSagas;