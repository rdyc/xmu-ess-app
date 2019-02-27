import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { ILeaveGetEnd } from '@leave/classes/response';
import { LeaveRequestAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.FETCH_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.FETCH_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.FETCH_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.FETCH_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as leaveGetEndReducer };