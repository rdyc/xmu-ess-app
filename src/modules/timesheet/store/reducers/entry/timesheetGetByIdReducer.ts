import { IQuerySingleState } from '@generic/interfaces';
import { ITimesheetGetByIdRequest } from '@timesheet/classes/queries/entry';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as timesheetGetByIdReducer };