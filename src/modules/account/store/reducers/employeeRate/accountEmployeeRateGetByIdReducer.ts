import { IEmployeeRateByIdRequest } from '@account/classes/queries/employeeRate';
import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeRateAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeRateByIdRequest, IEmployeeRate> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IEmployeeRateByIdRequest, IEmployeeRate>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as accountEmployeeRateGetByIdReducer };