import { IQuerySingleState } from '@generic/interfaces';
import { ILookupHolidayPutRequest } from '@lookup/classes/queries';
import { ILookupHoliday } from '@lookup/classes/response';
import { LookupHolidayAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ILookupHolidayPutRequest, ILookupHoliday> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ILookupHolidayPutRequest, ILookupHoliday>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as lookupHolidayPutReducer };