import { IQueryCollectionState } from '@generic/interfaces';
import { EmployeeAction as Action } from '@account/store/actions';
import { Reducer } from 'redux';
import { IEmployee } from '@account/interfaces/response';
import { IEmployeeAllRequest } from '@account/interfaces/queries';

const initialState: IQueryCollectionState<IEmployeeAllRequest, IEmployee> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IEmployeeAllRequest, IEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return state = initialState;

    default: { return state; }
  }
};

export { reducer as employeeGetAllReducer };