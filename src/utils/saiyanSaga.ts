import { apiRequest, IApiResponse } from '@utils/api';
import { all, call, Effect } from 'redux-saga/effects';

const API_ENDPOINT = process.env.REACT_APP_API_URL || '';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ISaiyanSaga {
  method: Method;
  path: string;
  payload?: any | undefined;
  success: (response: IApiResponse) => Effect[];
  failed: (response: IApiResponse) => Effect[];
  error: (error: any) => Effect[];
  finally: () => Effect[];
}

function* fetching(param: ISaiyanSaga) {
  try {
    const response: IApiResponse = yield call(apiRequest, param.method, API_ENDPOINT, param.path, param.payload);
    
    if (response.ok) {
      yield all(param.success(response));
    } else {
      yield all(param.failed(response));
    }
  } catch (error) {
    yield all(param.error(error));
  } finally {
    if (param.finally.length) {
      yield all(param.finally());
    }
  }
}

export default {
  fetch: fetching
};