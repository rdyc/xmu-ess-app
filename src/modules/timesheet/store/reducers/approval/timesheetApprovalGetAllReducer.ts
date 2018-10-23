import { IQueryCollectionState } from '@generic/interfaces';
import { ITimesheetApprovalGetAllRequest } from '@timesheet/classes/queries';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetApprovalAction as Action } from '@timesheet/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ITimesheetApprovalGetAllRequest, ITimesheet> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ITimesheetApprovalGetAllRequest, ITimesheet>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.APPROVAL_GET_ALL_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.APPROVAL_GET_ALL_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.APPROVAL_GET_ALL_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.APPROVAL_GET_ALL_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as timesheetApprovalGetAllReducer };