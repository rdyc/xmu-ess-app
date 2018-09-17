import { IResponseSingle } from '@generic/interfaces';
import { IProjectRegistrationRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { action } from 'typesafe-actions';

export const enum ProjectRegistrationAction {
  FETCH_REQUEST = '@@project-registration/FETCH_REQUEST',
  FETCH_SUCCESS = '@@project-registration/FETCH_SUCCESS',
  FETCH_ERROR = '@@project-registration/FETCH_ERROR'
}

export const ProjectRegistrationFetchRequest = (request: IProjectRegistrationRequest) => action(ProjectRegistrationAction.FETCH_REQUEST, request);
export const ProjectRegistrationFetchSuccess = (response: IResponseSingle<IProject>) => action(ProjectRegistrationAction.FETCH_SUCCESS, response);
export const ProjectRegistrationFetchError = (message: string) => action(ProjectRegistrationAction.FETCH_ERROR, message);