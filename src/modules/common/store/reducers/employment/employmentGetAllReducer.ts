import { ISystemAllRequest } from '@common/classes/queries';
import { ISystem } from '@common/classes/response';
import { EmploymentAction as Action } from '@common/store/actions';
import { IQueryCollectionState } from '@generic/interfaces';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISystemAllRequest, ISystem> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISystemAllRequest, ISystem>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as employmentGetAllReducer };