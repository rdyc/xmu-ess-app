import { IProjectStatusPutRequest } from '@project/classes/queries/status';
import { action } from 'typesafe-actions';

export const enum ProjectStatusAction {
  PUT_REQUEST = '@@project/status/PUT_REQUEST',
  PUT_SUCCESS = '@@project/status/PUT_SUCCESS',
  PUT_ERROR = '@@project/status/PUT_ERROR',
  PUT_DISPOSE = '@@project/status/PUT_DISPOSE',
}

// put 
export const projectStatusPutRequest = (request: IProjectStatusPutRequest) => action(ProjectStatusAction.PUT_REQUEST, request);
export const projectStatusPutSuccess = (response: boolean) => action(ProjectStatusAction.PUT_SUCCESS, response);
export const projectStatusPutError = (message: string) => action(ProjectStatusAction.PUT_ERROR, message);
export const projectStatusPutDispose = () => action(ProjectStatusAction.PUT_DISPOSE);