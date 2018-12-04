import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveApprovalPostRequest } from '@leave/classes/queries/approval';
import { ILeave } from '@leave/classes/response';
import { LeaveApprovalAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveApprovalPostRequest, ILeave> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILeaveApprovalPostRequest, ILeave>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as leaveApprovalPostReducer };