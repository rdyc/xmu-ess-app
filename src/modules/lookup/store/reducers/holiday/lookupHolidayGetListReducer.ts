import { IQueryCollectionState } from '@generic/interfaces';
import { ILookupHolidayGetListRequest } from '@lookup/classes/queries';
import { ILookupHolidayList } from '@lookup/classes/response';
import { LookupHolidayAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ILookupHolidayGetListRequest, ILookupHolidayList> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ILookupHolidayGetListRequest, ILookupHolidayList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as lookupHolidayGetListReducer };