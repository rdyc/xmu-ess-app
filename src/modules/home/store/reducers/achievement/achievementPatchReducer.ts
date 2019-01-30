import { IQuerySingleState } from '@generic/interfaces';
import { IAchievementPatchRequest } from '@home/classes/queries/achievement';
import { IAchievementPatch } from '@home/classes/response/achievement';
import { Reducer } from 'redux';
import { AchievementAction as Action } from '../../actions/achievementActions';

const initialState: IQuerySingleState<IAchievementPatchRequest, IAchievementPatch> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IAchievementPatchRequest, IAchievementPatch>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as achievementPatchReducer };