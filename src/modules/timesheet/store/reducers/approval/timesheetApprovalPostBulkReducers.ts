import { IQuerySingleState } from '@generic/interfaces';
import { ITimesheetApprovalPostBulkRequest } from '@timesheet/classes/queries/approval';
import { TimesheetApprovalAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITimesheetApprovalPostBulkRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ITimesheetApprovalPostBulkRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as timesheetApprovalPostBulkReducer };