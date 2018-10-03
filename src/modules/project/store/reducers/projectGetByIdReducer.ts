import { IQuerySingleState } from '@generic/interfaces';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import { IProjectDetail } from '@project/classes/response';
import { ProjectAction } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case ProjectAction.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case ProjectAction.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case ProjectAction.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case ProjectAction.GET_BY_ID_DISPOSE: return state = initialState;
    
    default: return state;
  }
};

export { reducer as projectGetByIdReducer };