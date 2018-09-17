import { IResponseCollection } from '@generic/interfaces';
import { IProjectRegistrationAllRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { action } from 'typesafe-actions';

export const enum ProjectRegistrationAllAction {
  FETCH_REQUEST = '@@project-registration-all/FETCH_REQUEST',
  FETCH_SUCCESS = '@@project-registration-all/FETCH_SUCCESS',
  FETCH_ERROR = '@@project-registration-all/FETCH_ERROR'
}

export const ProjectRegistrationFetchAllRequest = (request: IProjectRegistrationAllRequest) => action(ProjectRegistrationAllAction.FETCH_REQUEST, request);
export const ProjectRegistrationFetchAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectRegistrationAllAction.FETCH_SUCCESS, response);
export const ProjectRegistrationFetchAllError = (message: string) => action(ProjectRegistrationAllAction.FETCH_ERROR, message);