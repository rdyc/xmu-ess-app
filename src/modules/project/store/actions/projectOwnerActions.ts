import { IResponseSingle } from '@generic/interfaces/IResponseSingle';
import { IProjectOwnerPutRequest } from '@project/classes/queries/owner';
import { IProject } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectOwnerAction {
  PUT_REQUEST = '@@project/owner/PUT_REQUEST',
  PUT_SUCCESS = '@@project/owner/PUT_SUCCESS',
  PUT_ERROR = '@@project/owner/PUT_ERROR',
  PUT_DISPOSE = '@@project/owner/PUT_DISPOSE',
}

// put 
export const projectOwnerPutRequest = (request: IProjectOwnerPutRequest) => action(ProjectOwnerAction.PUT_REQUEST, request);
export const projectOwnerPutSuccess = (response: IResponseSingle<IProject>) => action(ProjectOwnerAction.PUT_SUCCESS, response);
export const projectOwnerPutError = (error: any) => action(ProjectOwnerAction.PUT_ERROR, error);
export const projectOwnerPutDispose = () => action(ProjectOwnerAction.PUT_DISPOSE);