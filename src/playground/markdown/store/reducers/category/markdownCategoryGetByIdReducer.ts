import { IQuerySingleState } from '@generic/interfaces';
import { IMarkdownCategoryGetById } from 'playground/markdown/classes/queries';
import { IMarkdownCategoryDetail } from 'playground/markdown/classes/response';
import { Reducer } from 'redux';
import { MarkdownCategoryAction as Action } from '../../actions';

const initialState: IQuerySingleState<IMarkdownCategoryGetById, IMarkdownCategoryDetail> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IMarkdownCategoryGetById, IMarkdownCategoryDetail>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_BY_ID_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_BY_ID_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_BY_ID_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_BY_ID_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as markdownCategoryGetByIdReducer };