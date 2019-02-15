import { IResponseCollection } from '@generic/interfaces';
import { IAchievementGetRequest } from '@home/classes/queries/achievement';
import { IAchievement } from '@home/classes/response/achievement/IAchievement';
import { action } from 'typesafe-actions';

export const enum AchievementAction {
  GET_REQUEST = '@@achievement/GET_REQUEST',
  GET_SUCCESS = '@@achievement/GET_SUCCESS',
  GET_ERROR = '@@achievement/GET_ERROR',
  GET_DISPOSE = '@@achievement/GET_DISPOSE'
}

// get all
export const achievementGetRequest = (request: IAchievementGetRequest) => action(AchievementAction.GET_REQUEST, request);
export const achievementGetSuccess = (response: IResponseCollection<IAchievement>) => action(AchievementAction.GET_SUCCESS, response);
export const achievementGetError = (message: any) => action(AchievementAction.GET_ERROR, message);
export const achievementGetDispose = () => action(AchievementAction.GET_DISPOSE);