import { IProjectOwnerPutRequest } from '@project/classes/queries/owner';
import { action } from 'typesafe-actions';

export const enum ProjectOwnerAction {
  PUT_REQUEST = '@@project/owner/PUT_REQUEST',
  PUT_SUCCESS = '@@project/owner/PUT_SUCCESS',
  PUT_ERROR = '@@project/owner/PUT_ERROR',
  PUT_DISPOSE = '@@project/owner/PUT_DISPOSE',
}

// put 
export const projectOwnerPutRequest = (request: IProjectOwnerPutRequest) => action(ProjectOwnerAction.PUT_REQUEST, request);
export const projectOwnerPutSuccess = (response: boolean) => action(ProjectOwnerAction.PUT_SUCCESS, response);
export const projectOwnerPutError = (message: string) => action(ProjectOwnerAction.PUT_ERROR, message);
export const projectOwnerPutDispose = () => action(ProjectOwnerAction.PUT_DISPOSE);