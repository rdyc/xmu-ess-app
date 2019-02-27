import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { GradeAction as Action } from '@common/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISystemListRequest, ISystemList> = {
  request: undefined,
  response: undefined,
  isExpired: false,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISystemListRequest, ISystemList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as gradeGetListReducer };