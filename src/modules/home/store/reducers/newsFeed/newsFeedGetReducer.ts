import { IQuerySingleState } from '@generic/interfaces';
import { INewsFeedGetRequest } from '@home/classes/queries/newsFeed';
import { INewsFeed } from '@home/classes/response/newsFeed';
import { Reducer } from 'redux';
import { NewsFeedAction as Action } from '../../actions/newsFeedAction';

const initialState: IQuerySingleState<INewsFeedGetRequest, INewsFeed> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<INewsFeedGetRequest, INewsFeed>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, ...initialState };

    default: { return state; }
  }
};

export { reducer as newsFeedGetReducer };
