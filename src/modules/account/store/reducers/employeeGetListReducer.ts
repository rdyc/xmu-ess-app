import { IEmployeeListRequest } from '@account/interfaces/queries';
import { IEmployee } from '@account/interfaces/response';
import { EmployeeAction as Action } from '@account/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeListRequest, IEmployee> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IEmployeeListRequest, IEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return state = initialState;

    default: { return state; }
  }
};

export { reducer as employeeGetListReducer };