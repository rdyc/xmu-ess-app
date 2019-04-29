import { IQuerySingleState } from '@generic/interfaces';
import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { IAchievementResult } from '@lookup/classes/response/achievement';
import { LookupAchievementAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IAchievementPatchRequest, IAchievementResult> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQuerySingleState<IAchievementPatchRequest, IAchievementResult>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as lookupAchievementPatchReducer };
