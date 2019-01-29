import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IAchievementGetRequest, IAchievementPatchRequest } from '@home/classes/queries/achievement';
import { IAchievementPatch } from '@home/classes/response/achievement';
import { IAchievement } from '@home/classes/response/achievement/IAchievement';
import { action } from 'typesafe-actions';

export const enum AchievementAction {
  GET_REQUEST = '@@achievement/GET_REQUEST',
  GET_SUCCESS = '@@achievement/GET_SUCCESS',
  GET_ERROR = '@@achievement/GET_ERROR',
  GET_DISPOSE = '@@achievement/GET_DISPOSE',
  PATCH_REQUEST = '@@achievement/PATCH_REQUEST',
  PATCH_SUCCESS = '@@achievement/PATCH_SUCCESS',
  PATCH_ERROR = '@@achievement/PATCH_ERROR',
  PATCH_DISPOSE = '@@achievement/PATCH_DISPOSE',

  PATCH_PROGRESS = '@@achievement/PATCH_PROGRESS'
}

// get all
export const achievementGetRequest = (request: IAchievementGetRequest) => action(AchievementAction.GET_REQUEST, request);
export const achievementGetSuccess = (response: IResponseCollection<IAchievement>) => action(AchievementAction.GET_SUCCESS, response);
export const achievementGetError = (message: string) => action(AchievementAction.GET_ERROR, message);
export const achievementGetDispose = () => action(AchievementAction.GET_DISPOSE);

// patch
export const achievementPatchRequest = (request: IAchievementPatchRequest) => action(AchievementAction.PATCH_REQUEST, request);
export const achievementPatchSuccess = (response: IResponseSingle<IAchievementPatch>) => action(AchievementAction.PATCH_SUCCESS, response);
export const achievementPatchError = (message: string) => action(AchievementAction.PATCH_ERROR, message);
export const achievementPatchDispose = () => action(AchievementAction.PATCH_DISPOSE);