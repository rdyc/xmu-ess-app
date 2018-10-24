import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectRegistrationGetAllRequest } from '@project/classes/queries/registration';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as projectRegistrationGetAllReducer };