import { IQuerySingleState } from '@generic/interfaces';
import { IEmployeeKPIPutFinalRequest } from '@kpi/classes/queries';
import { IEmployeeKPI } from '@kpi/classes/response';
import { EmployeeKPIAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeKPIPutFinalRequest, IEmployeeKPI> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IEmployeeKPIPutFinalRequest, IEmployeeKPI>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_FINAL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_FINAL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_FINAL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_FINAL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as employeeKPIPutFinalReducer };