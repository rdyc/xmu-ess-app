import { Reducer } from 'redux';
import { ProjectRegistrationAllAction } from '@project/store/actions/projectRegistrationAllActions';
import { IProjectRegistrationAllQuery } from '@project/interfaces/queries';
import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';
import { IProject } from '@project/interfaces/response';

const initialState: IProjectRegistrationAllQuery<IProjectRegistrationAllFilter, IProject> = {
  filter: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IProjectRegistrationAllQuery<IProjectRegistrationAllFilter, IProject>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectRegistrationAllAction.FETCH_REQUEST: {
      return { ...state, loading: true, parameter: action.payload };
    }
    case ProjectRegistrationAllAction.FETCH_SUCCESS: {
      return { ...state, loading: false, response: action.payload };
    }
    case ProjectRegistrationAllAction.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: { return state; }
  }
};

export { reducer as projectRegistrationQueryReducer };