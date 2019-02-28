import { IEmployeeEducationPostRequest } from '@account/classes/queries/employeeEducation';
import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { AccountEmployeeEducationAction as Action } from '@account/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IEmployeeEducationPostRequest, IEmployeeEducation> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IEmployeeEducationPostRequest, IEmployeeEducation>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as accountEmployeeEducationPostReducer };