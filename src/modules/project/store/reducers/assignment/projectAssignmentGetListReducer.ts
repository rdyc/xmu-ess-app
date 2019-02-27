import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectAssignmentGetListRequest } from '@project/classes/queries/assignment';
import { IProjectAssignmentList } from '@project/classes/response';
import { ProjectAssignmentAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: false };
    
    default: return state;
  }
};

export { reducer as projectAssignmentGetListReducer };