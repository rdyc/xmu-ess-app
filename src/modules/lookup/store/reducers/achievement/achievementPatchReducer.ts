import { IQuerySingleState } from '@generic/interfaces';
import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { IAchievementResult } from '@lookup/classes/response/achievement';
import { AchievementAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: IQuerySingleState<IAchievementPatchRequest, IAchievementResult> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IAchievementPatchRequest, IAchievementResult>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };
    
    default: return state;
  }
};

export { reducer as achievementPatchReducer };
