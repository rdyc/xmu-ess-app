import { Reducer } from 'redux';
import { ProjectRegistrationAllAction } from '@project/store/actions/projectRegistrationAllActions';
import { IProjectRegistrationAllQueryState } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { IProjectRegistrationAllRequest } from '@project/interfaces/queries/IProjectRegistrationAllRequest';

const initialState: IProjectRegistrationAllQueryState<IProjectRegistrationAllRequest, IProject> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IProjectRegistrationAllQueryState<IProjectRegistrationAllRequest, IProject>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectRegistrationAllAction.FETCH_REQUEST: {
      return { ...state, isLoading: true, isError: false, request: action.payload };
    }
    case ProjectRegistrationAllAction.FETCH_SUCCESS: {
      return { ...state, isLoading: false, isError: false, response: action.payload };
    }
    case ProjectRegistrationAllAction.FETCH_ERROR: {
      return { ...state, isLoading: false, isError: true, errors: action.payload };
    }
    default: { return state; }
  }
};

export { reducer as projectRegistrationQueryReducer };