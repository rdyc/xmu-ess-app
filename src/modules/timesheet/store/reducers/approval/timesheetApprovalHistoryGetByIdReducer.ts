import { IQuerySingleState } from '@generic/interfaces';
import { ITimesheetApprovalGetByIdRequest } from '@timesheet/classes/queries/approval';
import { ITimesheetDetail } from '@timesheet/classes/response';
import { TimesheetApprovalHistoryAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<ITimesheetApprovalGetByIdRequest, ITimesheetDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<ITimesheetApprovalGetByIdRequest, ITimesheetDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isExpired: true };
    
    default: return state;
  }
};

export { reducer as timesheetApprovalHistoryGetByIdReducer };