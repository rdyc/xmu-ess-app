import { IResponseCollection } from '@generic/interfaces';
import { IAnnouncementGetRequest, IAnnouncementPatchRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement/IAnnouncement';
import { action } from 'typesafe-actions';

export const enum AnnouncementAction {
  GET_REQUEST = '@@announcement/GET_REQUEST',
  GET_SUCCESS = '@@announcement/GET_SUCCESS',
  GET_ERROR = '@@announcement/GET_ERROR',
  GET_DISPOSE = '@@announcement/GET_DISPOSE',
  PATCH_REQUEST = '@@announcement/PATCH_REQUEST',
  PATCH_SUCCESS = '@@announcement/PATCH_SUCCESS',
  PATCH_ERROR = '@@announcement/PATCH_ERROR',
  PATCH_DISPOSE = '@@announcement/PATCH_DISPOSE'
}

// get all
export const announcementGetRequest = (request: IAnnouncementGetRequest) => action(AnnouncementAction.GET_REQUEST, request);
export const announcementGetSuccess = (response: IResponseCollection<IAnnouncement>) => action(AnnouncementAction.GET_SUCCESS, response);
export const announcementGetError = (message: string) => action(AnnouncementAction.GET_ERROR, message);
export const announcementGetDispose = () => action(AnnouncementAction.GET_DISPOSE);

// post
export const announcementPatchRequest = (request: IAnnouncementPatchRequest) => action(AnnouncementAction.PATCH_REQUEST, request);
export const announcementPatchSuccess = (response: IResponseCollection<IAnnouncement>) => action(AnnouncementAction.PATCH_SUCCESS, response);
export const announcementPatchError = (message: string) => action(AnnouncementAction.PATCH_ERROR, message);
export const announcementPatchDispose = () => action(AnnouncementAction.PATCH_DISPOSE);
