import { IProjectHourPutRequest } from '@project/classes/queries/hour';
import { action } from 'typesafe-actions';

export const enum ProjectHourAction {
  PUT_REQUEST = '@@project/hour/PUT_REQUEST',
  PUT_SUCCESS = '@@project/hour/PUT_SUCCESS',
  PUT_ERROR = '@@project/hour/PUT_ERROR',
  PUT_DISPOSE = '@@project/hour/PUT_DISPOSE',
}

// put 
export const projectHourPutRequest = (request: IProjectHourPutRequest) => action(ProjectHourAction.PUT_REQUEST, request);
export const projectHourPutSuccess = (response: boolean) => action(ProjectHourAction.PUT_SUCCESS, response);
export const projectHourPutError = (error: any) => action(ProjectHourAction.PUT_ERROR, error);
export const projectHourPutDispose = () => action(ProjectHourAction.PUT_DISPOSE);