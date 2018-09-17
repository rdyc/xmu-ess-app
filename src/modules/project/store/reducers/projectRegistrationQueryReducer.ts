import { Reducer } from 'redux';
import { ProjectRegistrationAllAction } from '@project/store/actions/projectRegistrationAllActions';
import { IProjectRegistrationQueryState, IProjectRegistrationRequest } from '@project/interfaces/queries';
import { IProjectDetail } from '@project/interfaces/response';

const initialState: IProjectRegistrationQueryState<IProjectRegistrationRequest, IProjectDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IProjectRegistrationQueryState<IProjectRegistrationRequest, IProjectDetail>> = (state = initialState, action) => {
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