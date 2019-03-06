import { IResponseCollection } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest
} from '@project/classes/queries/registration';
import { IProject } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectAdministrationAction {
  GET_ALL_REQUEST = '@@project/administration/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/administration/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/administration/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/administration/GET_ALL_DISPOSE',
}

// get all
export const projectAdministrationGetAllRequest = (request: IProjectRegistrationGetAllRequest) => action(ProjectAdministrationAction.GET_ALL_REQUEST, request);
export const projectAdministrationGetAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectAdministrationAction.GET_ALL_SUCCESS, response);
export const projectAdministrationGetAllError = (error: any) => action(ProjectAdministrationAction.GET_ALL_ERROR, error);
export const projectAdministrationGetAllDispose = () => action(ProjectAdministrationAction.GET_ALL_DISPOSE);
