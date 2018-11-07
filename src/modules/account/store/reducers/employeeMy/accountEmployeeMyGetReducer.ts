import { IEmployeeMy } from '@account/classes/response';
import { AccountEmployeeMyAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<{}, IEmployeeMy> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<{}, IEmployeeMy>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as accountEmployeeMyGetReducer };