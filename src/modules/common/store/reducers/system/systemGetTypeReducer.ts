import { ISystemType } from '@common/classes/response';
import { SystemAction as Action } from '@common/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<{}, ISystemType> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<{}, ISystemType>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_TYPE_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_TYPE_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_TYPE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_TYPE_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as systemGetTypeReducer };