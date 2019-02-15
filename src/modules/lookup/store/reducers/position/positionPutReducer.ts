import { IQuerySingleState } from '@generic/interfaces';
import { IPositionPutRequest } from '@lookup/classes/queries';
import { IPosition } from '@lookup/classes/response';
import { PositionAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IPositionPutRequest, IPosition> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IPositionPutRequest, IPosition>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PUT_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PUT_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PUT_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PUT_DISPOSE: return initialState;

    default: return state;
  }
};

export { reducer as positionPutReducer };