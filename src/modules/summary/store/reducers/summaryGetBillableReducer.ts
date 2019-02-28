import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetBillableRequest } from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BILLABLE_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BILLABLE_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BILLABLE_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BILLABLE_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as summaryGetBillableReducer };