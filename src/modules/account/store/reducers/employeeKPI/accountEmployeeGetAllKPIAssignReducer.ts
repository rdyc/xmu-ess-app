import { IEmployeeAllKPIAssignRequest } from '@account/classes/queries/employeeKPI';
import { IEmployeeKPIAssign } from '@account/classes/response/employeeKPI';
import { AccountEmployeeKPIAction as Action } from '@account/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeAllKPIAssignRequest, IEmployeeKPIAssign> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IEmployeeAllKPIAssignRequest, IEmployeeKPIAssign>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_ASSIGN_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_ASSIGN_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ASSIGN_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_ASSIGN_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as accountEmployeeGetAllKPIAssignReducer };