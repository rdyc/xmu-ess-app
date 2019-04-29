import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { IAchievementResult } from '@lookup/classes/response/achievement';
import { action } from 'typesafe-actions';

export const enum LookupAchievementAction {
  PATCH_REQUEST = '@@lookup/achievement/PATCH_REQUEST',
  PATCH_SUCCESS = '@@lookup/achievement/PATCH_SUCCESS',
  PATCH_ERROR = '@@lookup/achievement/PATCH_ERROR',
  PATCH_DISPOSE = '@@lookup/achievement/PATCH_DISPOSE',
}

// patch
export const lookupAchievementPatchRequest = (request: IAchievementPatchRequest) => action(LookupAchievementAction.PATCH_REQUEST, request);
export const lookupAchievementPatchSuccess = (response: IAchievementResult) => action(LookupAchievementAction.PATCH_SUCCESS, response);
export const lookupAchievementPatchError = (error: any) => action(LookupAchievementAction.PATCH_ERROR, error);
export const lookupAchievementPatchDispose = () => action(LookupAchievementAction.PATCH_DISPOSE);