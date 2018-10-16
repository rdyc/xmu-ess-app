import { IQuerySingleState } from '@generic/interfaces';
import { ITimesheetPutRequest } from '@timesheet/classes/queries';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITimesheetPutRequest, ITimesheet> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ITimesheetPutRequest, ITimesheet>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as timesheetPutReducer };