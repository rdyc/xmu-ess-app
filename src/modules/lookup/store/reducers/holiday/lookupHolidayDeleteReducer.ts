import { IQuerySingleState } from '@generic/interfaces';
import { ILookupHolidayDeleteRequest } from '@lookup/classes/queries';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupHolidayDeleteRequest, ILookupHoliday> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ILookupHolidayDeleteRequest, ILookupHoliday>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.DELETE_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.DELETE_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.DELETE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.DELETE_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as lookupHolidayDeleteReducer };