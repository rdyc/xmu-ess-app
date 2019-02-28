import { IQueryCollectionState } from '@generic/interfaces';
import { IAchievementGetRequest } from '@home/classes/queries/achievement';
import { IAchievement } from '@home/classes/response/achievement/IAchievement';
import { Reducer } from 'redux';
import { AchievementAction as Action } from '../../actions/achievementActions';

const initialState: IQueryCollectionState<IAchievementGetRequest, IAchievement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IAchievementGetRequest, IAchievement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as achievementGetReducer };