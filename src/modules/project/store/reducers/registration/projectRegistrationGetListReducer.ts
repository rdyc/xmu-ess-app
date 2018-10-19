import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectRegistrationGetListRequest } from '@project/classes/queries/registration';
import { IProjectList } from '@project/classes/response';
import { ProjectRegistrationAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectRegistrationGetListRequest, IProjectList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IProjectRegistrationGetListRequest, IProjectList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectRegistrationGetListReducer };