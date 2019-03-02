import { ISystemByIdRequest } from '@common/classes/queries';
import { ISystemDetail } from '@common/classes/response';
import { GenderAction as Action } from '@common/store/actions';
import { IQuerySingleState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ISystemByIdRequest, ISystemDetail> = {
  request: undefined,
  response: undefined,
  isExpired: false,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ISystemByIdRequest, ISystemDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as genderGetByIdReducer };