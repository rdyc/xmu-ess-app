import { ISystemByIdRequest } from '@common/interfaces/queries';
import { ISystemDetail } from '@common/interfaces/response';
import { SystemAction as Action } from '@common/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISystemByIdRequest, ISystemDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISystemByIdRequest, ISystemDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return state = initialState;
    
    default: return state;
  }
};

export { reducer as systemGetByIdReducer };