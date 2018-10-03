import { IQuerySingleState } from '@generic/interfaces';
import { IProjectGetListRequest } from '@project/classes/queries/IProjectGetListRequest';
import { IProjectList } from '@project/classes/response';
import { ProjectAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectGetListRequest, IProjectList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectGetListRequest, IProjectList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return state = initialState;
    
    default: return state;
  }
};

export { reducer as projectGetListReducer };