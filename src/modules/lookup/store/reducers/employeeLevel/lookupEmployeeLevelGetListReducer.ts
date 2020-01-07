import { IQueryCollectionState } from '@generic/interfaces';
import { IEmployeeLevelGetListRequest } from '@lookup/classes/queries';
import { IEmployeeLevelList } from '@lookup/classes/response';
import { LookupEmployeeLevelAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeLevelGetListRequest, IEmployeeLevelList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IEmployeeLevelGetListRequest, IEmployeeLevelList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true};

    default: { return state; }
  }
};

export { reducer as lookupEmployeeLevelGetListReducer };