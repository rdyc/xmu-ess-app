import { IQueryCollectionState } from '@generic/interfaces';
import { INewsFeedGetListRequest } from '@home/classes/queries/newsFeed';
import { INews } from '@home/classes/response/newsFeed';
import { Reducer } from 'redux';
import { NewsFeedAction as Action } from '../../actions/newsFeedAction';

const initialState: IQueryCollectionState<INewsFeedGetListRequest, INews> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<INewsFeedGetListRequest, INews>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as newsFeedGetListReducer };
