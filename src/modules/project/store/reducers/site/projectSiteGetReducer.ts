import { IQueryCollectionState } from '@generic/interfaces';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { ProjectSiteAction as Action } from '@project/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as projectSiteGetReducer };