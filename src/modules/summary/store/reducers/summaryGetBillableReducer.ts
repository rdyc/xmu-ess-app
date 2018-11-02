import { IQueryCollectionState } from '@generic/interfaces';
import { ISummaryGetBillableRequest } from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { SummaryAction as Action } from '@summary/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BILLABLE_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BILLABLE_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BILLABLE_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BILLABLE_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as summaryGetBillableReducer };