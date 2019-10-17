import { IQuerySingleState } from '@generic/interfaces';
import { IWebJobRecurringTriggerRequest } from '@webjob/classes/queries';
import { WebJobRecurringAction as Action } from '@webjob/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IWebJobRecurringTriggerRequest, boolean> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IWebJobRecurringTriggerRequest, boolean>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.TRIGGER_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.TRIGGER_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.TRIGGER_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.TRIGGER_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as webJobRecurringTriggerReducer };