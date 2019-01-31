import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { IAchievementResult } from '@lookup/classes/response/achievement';
import { action } from 'typesafe-actions';

export const enum AchievementAction {
  PATCH_REQUEST = '@@achievement/PATCH_REQUEST',
  PATCH_SUCCESS = '@@achievement/PATCH_SUCCESS',
  PATCH_ERROR = '@@achievement/PATCH_ERROR',
  PATCH_DISPOSE = '@@achievement/PATCH_DISPOSE',
}

// patch
export const achievementPatchRequest = (request: IAchievementPatchRequest) => action(AchievementAction.PATCH_REQUEST, request);
export const achievementPatchSuccess = (response: IAchievementResult) => action(AchievementAction.PATCH_SUCCESS, response);
export const achievementPatchError = (message: string) => action(AchievementAction.PATCH_ERROR, message);
export const achievementPatchDispose = () => action(AchievementAction.PATCH_DISPOSE);