import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveRequestPutRequest } from '@leave/classes/queries/request';
import { ILeaveRequest } from '@leave/classes/response';
import { LeaveRequestAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as leaveRequestPutReducer };