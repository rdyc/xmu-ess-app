import { IQuerySingleState } from '@generic/interfaces';
import { IKPIEmployeePutAchievedRequest } from '@kpi/classes/queries';
import { IKPIEmployee } from '@kpi/classes/response';
import { KPIEmployeeAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPIEmployeePutAchievedRequest, IKPIEmployee> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPIEmployeePutAchievedRequest, IKPIEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_ACHIEVED_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_ACHIEVED_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ACHIEVED_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_ACHIEVED_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiEmployeePutAchievedReducer };