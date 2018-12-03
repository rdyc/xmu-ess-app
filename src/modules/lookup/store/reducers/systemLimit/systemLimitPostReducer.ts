import { IQuerySingleState } from '@generic/interfaces';
import { ISystemLimitPostRequest } from '@lookup/classes/queries';
import { ISystemLimit } from '@lookup/classes/response';
import { SystemLimitAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISystemLimitPostRequest, ISystemLimit> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISystemLimitPostRequest, ISystemLimit>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as systemLimitPostReducer };