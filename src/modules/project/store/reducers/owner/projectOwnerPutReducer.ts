import { IQuerySingleState } from '@generic/interfaces';
import { IProjectOwnerPutRequest } from '@project/classes/queries/owner';
import { ProjectOwnerAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectOwnerPutRequest, boolean> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectOwnerPutRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as projectOwnerPutReducer };