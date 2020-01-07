import { apiRequest, IApiResponse } from '@utils/api';
import { all, call, Effect } from 'redux-saga/effects';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ISaiyanSaga {
  host?: string;
  method: Method;
  path: string;
  isJsonContent?: boolean;
  payload?: any;
  successEffects: (response: IApiResponse) => Effect[];
  successCallback?: (response: IApiResponse) => void;
  failureEffects: (response: IApiResponse) => Effect[];
  failureCallback?: (response: IApiResponse) => void;
  errorEffects: (error: any) => Effect[];
  errorCallback?: (response: any) => void;
  finallyEffects?: Effect[];
}

function* fetching(param: ISaiyanSaga) {
  try {
    const response: IApiResponse = yield call(apiRequest, param.method, param.host || API_ENDPOINT, param.path, param.payload, param.isJsonContent === undefined ? true : param.isJsonContent);
    
    if (response.ok) {
      yield all(param.successEffects(response));

      if (param.successCallback) {
        param.successCallback(response);
      }
    } else {
      yield all(param.failureEffects(response));

      if (param.failureCallback) {
        param.failureCallback(response);
      }
    }
  } catch (error) {
    yield all(param.errorEffects(error));

    if (param.errorCallback) {
      param.errorCallback(error);
    }
  } finally {
    if (param.finallyEffects && param.finallyEffects.length) {
      yield all(param.finallyEffects);
    }
  }
}

export default {
  fetch: fetching
};