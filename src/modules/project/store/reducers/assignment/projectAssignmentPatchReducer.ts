import { IQuerySingleState } from '@generic/interfaces';
import { IProjectAssignmentPatchRequest } from '@project/classes/queries/assignment';
import { ProjectAssignmentAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectAssignmentPatchRequest, undefined> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectAssignmentPatchRequest, undefined>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectAssignmentPatchReducer };