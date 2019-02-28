import { IQuerySingleState } from '@generic/interfaces';
import { IProjectApprovalPostRequest } from '@project/classes/queries/approval';
import { ProjectApprovalAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectApprovalPostRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IProjectApprovalPostRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectApprovalPostReducer };