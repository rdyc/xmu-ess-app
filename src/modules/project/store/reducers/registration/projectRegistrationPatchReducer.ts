import { IQuerySingleState } from '@generic/interfaces';
import { IProjectRegistrationPatchRequest } from '@project/classes/queries/registration';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectRegistrationPatchRequest, IProject> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectRegistrationPatchRequest, IProject>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectRegistrationPatchReducer };