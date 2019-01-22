import { IResponseCollection } from '@generic/interfaces';
import { IAnnouncementGetRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement/IAnnouncement';
import { action } from 'typesafe-actions';

export const enum AnnouncementAction {
  GET_REQUEST = '@@announcement/GET_REQUEST',
  GET_SUCCESS = '@@announcement/GET_SUCCESS',
  GET_ERROR = '@@announcement/GET_ERROR',
  GET_DISPOSE = '@@announcement/GET_DISPOSE',
}

// get all
export const announcementGetRequest = (request: IAnnouncementGetRequest) => action(AnnouncementAction.GET_REQUEST, request);
export const announcementGetSuccess = (response: IResponseCollection<IAnnouncement>) => action(AnnouncementAction.GET_SUCCESS, response);
export const announcementGetError = (message: string) => action(AnnouncementAction.GET_ERROR, message);
export const announcementGetDispose = () => action(AnnouncementAction.GET_DISPOSE);
