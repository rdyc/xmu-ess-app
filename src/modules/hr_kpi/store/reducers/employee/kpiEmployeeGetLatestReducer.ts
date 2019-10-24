import { IQuerySingleState } from '@generic/interfaces';
import { IKPIEmployeeGetLatestRequest } from '@kpi/classes/queries';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIEmployeeGetLatestRequest, IKPIEmployee> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIEmployeeGetLatestRequest, IKPIEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LATEST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LATEST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LATEST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LATEST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiEmployeeGetLatestReducer };