import {
  HRTemplateAction as Action,
  hrTemplateGetAllDispose,
  hrTemplateGetAllError,
  hrTemplateGetAllRequest,
  hrTemplateGetAllSuccess,
  hrTemplateGetByIdDispose,
  hrTemplateGetByIdError,
  hrTemplateGetByIdRequest,
  hrTemplateGetByIdSuccess,
  hrTemplatePostError,
  hrTemplatePostRequest,
  hrTemplatePostSuccess,
  hrTemplatePutError,
  hrTemplatePutRequest,
  hrTemplatePutSuccess,
} from '@hr/store/actions';
import { handleResponse } from '@layout/helper/handleResponse';
import { layoutAlertAdd, UserAction } from '@layout/store/actions';
import saiyanSaga from '@utils/saiyanSaga';
import * as qs from 'qs';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { IApiResponse } from 'utils';

function* watchGetAllRequest() {
  const worker = (action: ReturnType<typeof hrTemplateGetAllRequest>) => {
    const params = qs.stringify(action.payload.filter, { 
      allowDots: true, 
      skipNulls: true
    });

    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/templates?${params}`,
      successEffects: (response: IApiResponse) => [
        put(hrTemplateGetAllSuccess(response.body)),
      ],
      failureEffects: (response: IApiResponse) => [
        put(hrTemplateGetAllError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(hrTemplateGetAllError(error.message))
      ],
      finallyEffects: [
        // nothing
      ]
    });
  };

  yield takeEvery(Action.GET_ALL_REQUEST, worker);
}

function* watchGetByIdRequest() {
  const worker = (action: ReturnType<typeof hrTemplateGetByIdRequest>) => {
    return saiyanSaga.fetch({
      method: 'get',
      path: `/v1/kpi/templates/${action.payload.templateUid}`,
      successEffects: (response: IApiResponse) => [
        put(hrTemplateGetByIdSuccess(response.body))
      ],
      failureEffects: (response: IApiResponse) => [
        put(hrTemplateGetByIdError(response))
      ],
      errorEffects: (error: TypeError) => [
        put(hrTemplateGetByIdError(error.message))
      ]
    });
  };

  yield takeEvery(Action.GET_BY_ID_REQUEST, worker);
}

function* watchPostRequest() {
  const worker = (action: ReturnType<typeof hrTemplatePostRequest>) => {
    return saiyanSaga.fetch({
      method: 'post',
      path: `/v1/kpi/templates`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrTemplateGetByIdDispose()),
        put(hrTemplateGetAllDispose()),
        put(hrTemplatePostSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrTemplatePostError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrTemplatePostError(error.message)),
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
  const worker = (action: ReturnType<typeof hrTemplatePutRequest>) => {
    return saiyanSaga.fetch({
      method: 'put',
      path: `/v1/kpi/templates/${action.payload.templateUid}`,
      payload: action.payload.data,
      successEffects: (response: IApiResponse) => [
        put(hrTemplateGetByIdDispose()),
        put(hrTemplateGetAllDispose()),
        put(hrTemplatePutSuccess(response.body))
      ],
      successCallback: (response: IApiResponse) => {
        action.payload.resolve(response.body.data);
      },
      failureEffects: (response: IApiResponse) => [
        put(hrTemplatePutError(response.statusText))
      ],
      failureCallback: (response: IApiResponse) => {
        const result = handleResponse(response);
        
        action.payload.reject(result);
      },
      errorEffects: (error: TypeError) => [
        put(hrTemplatePutError(error.message)),
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
      put(hrTemplateGetAllDispose()),
      put(hrTemplateGetByIdDispose())
    ]);
  }

  yield takeEvery(UserAction.SWITCH_ACCESS, worker);
}

function* hrTemplateSagas() {
  yield all([
    fork(watchGetAllRequest),
    fork(watchGetByIdRequest),
    fork(watchPostRequest),
    fork(watchPutRequest),
    fork(watchSwitchAccess)
  ]);
}

export default hrTemplateSagas;