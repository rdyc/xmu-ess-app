import { IEmployeeContractPostRequest } from '@account/classes/queries/employeeContract';
import { IEmployeeContract } from '@account/classes/response/employeeContract';
import { AccountEmployeeContractAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeContractPostRequest, IEmployeeContract> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IEmployeeContractPostRequest, IEmployeeContract>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as accountEmployeeContractPostReducer };