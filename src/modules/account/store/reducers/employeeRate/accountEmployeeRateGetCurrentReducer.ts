import { IEmployeeRateCurrentRequest } from '@account/classes/queries/employeeRate';
import { IEmployeeRateCurrent } from '@account/classes/response/employeeRate';
import { AccountEmployeeRateAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeRateCurrentRequest, IEmployeeRateCurrent> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IEmployeeRateCurrentRequest, IEmployeeRateCurrent>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_CURRENT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_CURRENT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_CURRENT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_CURRENT_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as accountEmployeeRateGetCurrentReducer };