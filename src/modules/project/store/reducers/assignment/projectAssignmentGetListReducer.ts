import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectAssignmentGetListRequest } from '@project/classes/queries/assignment';
import { IProjectAssignmentList } from '@project/classes/response';
import { ProjectAssignmentAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectAssignmentGetListReducer };