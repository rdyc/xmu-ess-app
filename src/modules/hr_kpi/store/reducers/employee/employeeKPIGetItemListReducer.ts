import { IQueryCollectionState } from '@generic/interfaces';
import { IEmployeeKPIGetItemListRequest } from '@kpi/classes/queries';
import { IEmployeeKPIItem } from '@kpi/classes/response';
import { EmployeeKPIAction as Action } from '@kpi/store/actions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IEmployeeKPIGetItemListRequest, IEmployeeKPIItem> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IEmployeeKPIGetItemListRequest, IEmployeeKPIItem>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_ITEM_LIST_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_ITEM_LIST_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ITEM_LIST_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_ITEM_LIST_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as employeeKPIGetItemListReducer };