import { IQuerySingleState } from '@generic/interfaces';
import { IKPITemplatePutRequest } from '@KPI/classes/queries';
import { IKPITemplate } from '@KPI/classes/response';
import { KPITemplateAction as Action } from '@KPI/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IKPITemplatePutRequest, IKPITemplate> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IKPITemplatePutRequest, IKPITemplate>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as KPITemplatePutReducer };