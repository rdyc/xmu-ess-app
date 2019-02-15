import { IQuerySingleState } from '@generic/interfaces';
import { ILeaveGetEndQuery } from '@leave/classes/queries/request';
import { ILeaveGetEnd } from '@leave/classes/response';
import { LeaveRequestAction as Action } from '@leave/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILeaveGetEndQuery, ILeaveGetEnd>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.FETCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.FETCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.FETCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.FETCH_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as leaveGetEndReducer };