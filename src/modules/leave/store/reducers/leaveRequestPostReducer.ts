import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveRequestPostRequest } from '@leave/classes/queries';
import { ILeaveRequest } from '@leave/classes/response';
import { LeaveRequestAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveRequestPostRequest, ILeaveRequest> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILeaveRequestPostRequest, ILeaveRequest>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as leaveRequestPostReducer };