import { IEmployeePutRequest } from '@account/classes/queries';
import { IEmployee } from '@account/classes/response';
import { AccountEmployeeAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeePutRequest, IEmployee> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IEmployeePutRequest, IEmployee>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as accountEmployeePutReducer };