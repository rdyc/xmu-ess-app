import { IEmployeeAllKPIFinalRequest } from '@account/classes/queries/employeeKPI';
import { IEmployeeKPIFinal } from '@account/classes/response/employeeKPI';
import { AccountEmployeeKPIAction as Action } from '@account/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeAllKPIFinalRequest, IEmployeeKPIFinal> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IEmployeeAllKPIFinalRequest, IEmployeeKPIFinal>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_FINAL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_FINAL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_FINAL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_FINAL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as accountEmployeeGetAllKPIFinalReducer };