import { IQuerySingleState } from '@generic/interfaces';
import { ILeavePutRequest } from '@lookup/classes/queries';
import { ILeave } from '@lookup/classes/response';
import { LeaveAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILeavePutRequest, ILeave> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ILeavePutRequest, ILeave>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as leavePutReducer };