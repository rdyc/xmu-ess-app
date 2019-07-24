import { IQueryCollectionState } from '@generic/interfaces';
import { IMarkdownCategoryGetAll } from 'playground/markdown/classes/queries';
import { IMarkdownCategory } from 'playground/markdown/classes/response';
import { Reducer } from 'redux';
import { MarkdownCategoryAction as Action } from '../../actions';

const initialState: IQueryCollectionState<IMarkdownCategoryGetAll, IMarkdownCategory> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IMarkdownCategoryGetAll, IMarkdownCategory>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ALL_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ALL_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ALL_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ALL_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as markdownCategoryGetAllReducer };