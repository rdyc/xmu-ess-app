import { action } from 'typesafe-actions';
import { IProjectRegistrationAllQuery } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';

export const enum ProjectRegistrationAllAction {
  FETCH_REQUEST = '@@project-registration-all/FETCH_REQUEST',
  FETCH_SUCCESS = '@@project-registration-all/FETCH_SUCCESS',
  FETCH_ERROR = '@@project-registration-all/FETCH_ERROR'
}

export const ProjectRegistrationFetchAllRequest = (params: IProjectRegistrationAllQuery<IProjectRegistrationAllFilter, IProject>) => action(ProjectRegistrationAllAction.FETCH_REQUEST, params);
export const ProjectRegistrationFetchAllSuccess = (data: IProject) => action(ProjectRegistrationAllAction.FETCH_SUCCESS, data);
export const ProjectRegistrationFetchAllError = (message: string) => action(ProjectRegistrationAllAction.FETCH_ERROR, message);