import { IQuerySingleState } from '@generic/interfaces';
import { ITimesheetPostRequest } from '@timesheet/classes/queries/entry';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetEntryAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITimesheetPostRequest, ITimesheet> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ITimesheetPostRequest, ITimesheet>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as timesheetEntryPostReducer };