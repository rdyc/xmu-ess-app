import { Reducer } from 'redux';
import { ProjectRegistrationAction } from '@project/store/actions';
import { IQueryState, IProjectRegistrationRequest } from '@project/interfaces/queries';
import { IProjectDetail } from '@project/interfaces/response';

const initialState: IQueryState<IProjectRegistrationRequest, IProjectDetail> = {
  request: {
    companyUid: undefined,
    positionUid: undefined,
    projectUid: undefined,
  },
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryState<IProjectRegistrationRequest, IProjectDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectRegistrationAction.FETCH_REQUEST: {
      return { ...state, isLoading: true, request: action.payload };
    }
    case ProjectRegistrationAction.FETCH_SUCCESS: {
      return { ...state, isLoading: false, response: action.payload };
    }
    case ProjectRegistrationAction.FETCH_ERROR: {
      return { ...state, isLoading: false, isError: true, errors: action.payload };
    }
    default: { return state; }
  }
};

export { reducer as projectRegistrationQueryReducer };