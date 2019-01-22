import { IQuerySingleState } from '@generic/interfaces';
import { IAchievementGetRequest } from '@home/classes/queries/achievement';
import { IAchievement } from '@home/classes/response/achievement/IAchievement';
import { Reducer } from 'redux';
import { AchievementAction as Action } from '../../actions/achievementActions';

const initialState: IQuerySingleState<IAchievementGetRequest, IAchievement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQuerySingleState<IAchievementGetRequest, IAchievement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as achievementGetReducer };