import { IQuerySingleState } from '@generic/interfaces';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationAction as Action } from '@project/store/actions';
import { IPurchasePutRequest } from '@purchase/classes/queries/purchaseRequest';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPurchasePutRequest, IProject> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPurchasePutRequest, IProject>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;
    
    default: return state;
  }
};

export { reducer as purchasePutReducer };