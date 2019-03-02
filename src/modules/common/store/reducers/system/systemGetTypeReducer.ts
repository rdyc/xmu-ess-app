import { ISystemType } from '@common/classes/response';
import { SystemAction as Action } from '@common/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<{}, ISystemType> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<{}, ISystemType>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_TYPE_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false};
    case Action.GET_TYPE_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_TYPE_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_TYPE_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as systemGetTypeReducer };