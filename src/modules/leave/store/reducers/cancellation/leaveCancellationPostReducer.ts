import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveCancellationPostRequest } from '@leave/classes/queries/cancellation';
import { ILeave } from '@leave/classes/response';
import { LeaveCancellationAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveCancellationPostRequest, ILeave> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ILeaveCancellationPostRequest, ILeave>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as leaveCancellationPostReducer };