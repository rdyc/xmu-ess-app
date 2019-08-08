import { IQueryCollectionState } from '@generic/interfaces';
import { IKPICategoryGetListRequest } from '@kpi/classes/queries/category';
import { IKPICategoryList } from '@kpi/classes/response/category';
import { KPICategoryAction as Action } from '@kpi/store/actions/category/kpiCategoryActions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IKPICategoryGetListRequest, IKPICategoryList> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IKPICategoryGetListRequest, IKPICategoryList>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiCategoryGetListReducer };