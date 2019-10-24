import { IQueryCollectionState } from '@generic/interfaces';
import { IMarkdownCategoryGetList } from 'playground/markdown/classes/queries';
import { IMarkdownCategory } from 'playground/markdown/classes/response';
import { Reducer } from 'redux';
import { MarkdownCategoryAction as Action } from '../../actions';

const initialState: IQueryCollectionState<IMarkdownCategoryGetList, IMarkdownCategory> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IMarkdownCategoryGetList, IMarkdownCategory>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as markdownCategoryGetListReducer };