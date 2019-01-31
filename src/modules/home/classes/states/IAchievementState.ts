import { IQueryCollectionState } from '@generic/interfaces';
import { IAchievementGetRequest } from '../queries/achievement';
import { IAchievement } from '../response/achievement';

export interface IAchievementState {
  achievementGet: IQueryCollectionState<IAchievementGetRequest, IAchievement>;
}