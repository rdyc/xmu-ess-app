import { IQueryCollectionState } from '@generic/interfaces';
import { IWebJobDefinitionJobGetListRequest } from '@webjob/classes/queries';
import { IWebJobDefinitionJobList } from '@webjob/classes/response';
import { WebJobDefinitionAction as Action } from '@webjob/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IWebJobDefinitionJobGetListRequest, IWebJobDefinitionJobList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IWebJobDefinitionJobGetListRequest, IWebJobDefinitionJobList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.JOB_GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.JOB_GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.JOB_GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.JOB_GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as webJobDefinitionJobGetListReducer };