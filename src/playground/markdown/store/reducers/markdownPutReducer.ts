import { IQuerySingleState } from '@generic/interfaces';
import { IMarkdownPut } from 'playground/markdown/classes/queries';
import { IMarkdown } from 'playground/markdown/classes/response';
import { Reducer } from 'redux';
import { MarkdownAction as Action } from '../actions';

const initialState: IQuerySingleState<IMarkdownPut, IMarkdown> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IMarkdownPut, IMarkdown>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as markdownPutReducer };