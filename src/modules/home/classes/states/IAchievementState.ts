import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IAchievementGetRequest, IAchievementPatchRequest } from '../queries/achievement';
import { IAchievement, IAchievementPatch } from '../response/achievement';

export interface IAchievementState {
  achievementGet: IQueryCollectionState<IAchievementGetRequest, IAchievement>;
  achievementPatch: IQuerySingleState<IAchievementPatchRequest, IAchievementPatch>;
}