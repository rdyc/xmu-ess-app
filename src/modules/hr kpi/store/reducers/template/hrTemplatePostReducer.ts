import { IQuerySingleState } from '@generic/interfaces';
import { IHRTemplatePostRequest } from '@hr/classes/queries';
import { IHRTemplate } from '@hr/classes/response';
import { HRTemplateAction as Action } from '@hr/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IHRTemplatePostRequest, IHRTemplate> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IHRTemplatePostRequest, IHRTemplate>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.POST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.POST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.POST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.POST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as hrTemplatePostReducer };