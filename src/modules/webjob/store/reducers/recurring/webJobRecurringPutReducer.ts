import { IQuerySingleState } from '@generic/interfaces';
import { IWebJobRecurringPutRequest } from '@webjob/classes/queries';
import { IWebJobRecurring } from '@webjob/classes/response';
import { WebJobRecurringAction as Action } from '@webjob/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IWebJobRecurringPutRequest, IWebJobRecurring> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IWebJobRecurringPutRequest, IWebJobRecurring>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as webJobRecurringPutReducer };