import { 
  IEmployeeExperienceAllRequest, 
  IEmployeeExperienceByIdRequest, 
  IEmployeeExperienceDeleteRequest, 
  IEmployeeExperienceListRequest, 
  IEmployeeExperiencePostRequest, 
  IEmployeeExperiencePutRequest 
} from '@account/classes/queries/employeeExperience';
import { 
  IEmployeeExperience, 
  IEmployeeExperienceDetail, 
  IEmployeeExperienceList 
} from '@account/classes/response/employeeExperience';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeExperienceAction {
  GET_ALL_REQUEST = '@@account/employee/experience/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/experience/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/experience/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/experience/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/experience/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/experience/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/experience/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/experience/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/experience/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/experience/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/experience/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/experience/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/experience/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/experience/POST_SUCCESS',
  POST_ERROR = '@@account/employee/experience/POST_ERROR',
  POST_DISPOSE = '@@account/employee/experience/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/experience/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/experience/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/experience/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/experience/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/experience/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/experience/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/experience/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/experience/DELETE_DISPOSE'
}

// get all
export const accountEmployeeExperienceGetAllRequest = (request: IEmployeeExperienceAllRequest) => action(AccountEmployeeExperienceAction.GET_ALL_REQUEST, request);
export const accountEmployeeExperienceGetAllSuccess = (response: IResponseCollection<IEmployeeExperience>) => action(AccountEmployeeExperienceAction.GET_ALL_SUCCESS, response);
export const accountEmployeeExperienceGetAllError = (message: string) => action(AccountEmployeeExperienceAction.GET_ALL_ERROR, message);
export const accountEmployeeExperienceGetAllDispose = () => action(AccountEmployeeExperienceAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeExperienceGetListRequest = (request: IEmployeeExperienceListRequest) => action(AccountEmployeeExperienceAction.GET_LIST_REQUEST, request);
export const accountEmployeeExperienceGetListSuccess = (response: IResponseCollection<IEmployeeExperienceList>) => action(AccountEmployeeExperienceAction.GET_LIST_SUCCESS, response);
export const accountEmployeeExperienceGetListError = (message: string) => action(AccountEmployeeExperienceAction.GET_LIST_ERROR, message);
export const accountEmployeeExperienceGetListDispose = () => action(AccountEmployeeExperienceAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeExperienceGetByIdRequest = (request: IEmployeeExperienceByIdRequest) => action(AccountEmployeeExperienceAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeExperienceGetByIdSuccess = (response: IResponseCollection<IEmployeeExperienceDetail>) => action(AccountEmployeeExperienceAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeExperienceGetByIdError = (message: string) => action(AccountEmployeeExperienceAction.GET_BY_ID_ERROR, message);
export const accountEmployeeExperienceGetByIdDispose = () => action(AccountEmployeeExperienceAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeExperiencePostRequest = (request: IEmployeeExperiencePostRequest) => action(AccountEmployeeExperienceAction.POST_REQUEST, request);
export const accountEmployeeExperiencePostSuccess = (response: IResponseSingle<IEmployeeExperience>) => action(AccountEmployeeExperienceAction.POST_SUCCESS, response);
export const accountEmployeeExperiencePostError = (message: string) => action(AccountEmployeeExperienceAction.POST_ERROR, message);
export const accountEmployeeExperiencePostDispose = () => action(AccountEmployeeExperienceAction.POST_DISPOSE);

// put
export const accountEmployeeExperiencePutRequest = (request: IEmployeeExperiencePutRequest) => action(AccountEmployeeExperienceAction.PUT_REQUEST, request);
export const accountEmployeeExperiencePutSuccess = (response: IResponseSingle<IEmployeeExperience>) => action(AccountEmployeeExperienceAction.PUT_SUCCESS, response);
export const accountEmployeeExperiencePutError = (message: string) => action(AccountEmployeeExperienceAction.PUT_ERROR, message);
export const accountEmployeeExperiencePutDispose = () => action(AccountEmployeeExperienceAction.PUT_DISPOSE);

// delete
export const accountEmployeeExperienceDeleteRequest = (request: IEmployeeExperienceDeleteRequest) => action(AccountEmployeeExperienceAction.DELETE_REQUEST, request);
export const accountEmployeeExperienceDeleteSuccess = (response: boolean) => action(AccountEmployeeExperienceAction.DELETE_SUCCESS, response);
export const accountEmployeeExperienceDeleteError = (message: string) => action(AccountEmployeeExperienceAction.DELETE_ERROR, message);
export const accountEmployeeExperienceDeleteDispose = () => action(AccountEmployeeExperienceAction.DELETE_DISPOSE);
