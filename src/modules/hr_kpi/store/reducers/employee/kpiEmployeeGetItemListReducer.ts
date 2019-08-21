import { IQueryCollectionState } from '@generic/interfaces';
import { IKPIEmployeeGetItemListRequest } from '@kpi/classes/queries';
import { IKPIEmployeeItem } from '@kpi/classes/response';
import { KPIEmployeeAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IKPIEmployeeGetItemListRequest, IKPIEmployeeItem> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IKPIEmployeeGetItemListRequest, IKPIEmployeeItem>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ITEM_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ITEM_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ITEM_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ITEM_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as kpiEmployeeGetItemListReducer };