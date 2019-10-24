import { IQuerySingleState } from '@generic/interfaces';
import { INotifTemplatePutRequest } from '@hr.notification/classes/queries/template';
import { INotifTemplate } from '@hr.notification/classes/response';
import { NotifTemplateAction as Action } from '@hr.notification/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<INotifTemplatePutRequest, INotifTemplate> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<INotifTemplatePutRequest, INotifTemplate>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as notifTemplatePutReducer };