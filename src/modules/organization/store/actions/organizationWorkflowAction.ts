import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IOrganizationWorkflowAllRequest, 
  IOrganizationWorkflowByIdRequest, 
  IOrganizationWorkflowDeleteRequest, 
  IOrganizationWorkflowListRequest, 
  IOrganizationWorkflowMenuRequest, 
  IOrganizationWorkflowPostRequest, 
  IOrganizationWorkflowPutRequest
} from '@organization/classes/queries/workflow';
import { IWorkflow, IWorkflowList } from '@organization/classes/response/workflow';
import { IWorkflowMenu } from '@organization/classes/response/workflow/IWorkflowMenu';
import { action } from 'typesafe-actions';

export const enum OrganizationWorkflowAction {
  GET_ALL_REQUEST = '@@organization/workflow/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@organization/workflow/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@organization/workflow/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@organization/workflow/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@organization/workflow/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@organization/workflow/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@organization/workflow/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@organization/workflow/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@organization/workflow/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@organization/workflow/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@organization/workflow/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@organization/workflow/GET_BY_ID_DISPOSE',
  GET_BY_MENU_REQUEST = '@@organization/workflow/GET_BY_MENU_REQUEST',
  GET_BY_MENU_SUCCESS = '@@organization/workflow/GET_BY_MENU_SUCCESS',
  GET_BY_MENU_ERROR = '@@organization/workflow/GET_BY_MENU_ERROR',
  GET_BY_MENU_DISPOSE = '@@organization/workflow/GET_BY_MENU_DISPOSE',
  POST_REQUEST = '@@organization/workflow/POST_REQUEST',
  POST_SUCCESS = '@@organization/workflow/POST_SUCCESS',
  POST_ERROR = '@@organization/workflow/POST_ERROR',
  POST_DISPOSE = '@@organization/workflow/POST_DISPOSE',
  PUT_REQUEST = '@@organization/workflow/PUT_REQUEST',
  PUT_SUCCESS = '@@organization/workflow/PUT_SUCCESS',
  PUT_ERROR = '@@organization/workflow/PUT_ERROR',
  PUT_DISPOSE = '@@organization/workflow/DELETE_DISPOSE',
  DELETE_REQUEST = '@@organization/workflow/DELETE_REQUEST',
  DELETE_SUCCESS = '@@organization/workflow/DELETE_SUCCESS',
  DELETE_ERROR = '@@organization/workflow/DELETE_ERROR',
  DELETE_DISPOSE = '@@organization/workflow/DELETE_DISPOSE',
}

// get all
export const organizationWorkflowGetAllRequest = (request: IOrganizationWorkflowAllRequest) => action(OrganizationWorkflowAction.GET_ALL_REQUEST, request);
export const organizationWorkflowGetAllSuccess = (response: IResponseCollection<IWorkflow>) => action(OrganizationWorkflowAction.GET_ALL_SUCCESS, response);
export const organizationWorkflowGetAllError = (error: any) => action(OrganizationWorkflowAction.GET_ALL_ERROR, error);
export const organizationWorkflowGetAllDispose = () => action(OrganizationWorkflowAction.GET_ALL_DISPOSE);

// get list
export const organizationWorkflowGetListRequest = (request: IOrganizationWorkflowListRequest) => action(OrganizationWorkflowAction.GET_LIST_REQUEST, request);
export const organizationWorkflowGetListSuccess = (response: IResponseCollection<IWorkflowList>) => action(OrganizationWorkflowAction.GET_LIST_SUCCESS, response);
export const organizationWorkflowGetListError = (error: any) => action(OrganizationWorkflowAction.GET_LIST_ERROR, error);
export const organizationWorkflowGetListDispose = () => action(OrganizationWorkflowAction.GET_LIST_DISPOSE);

// get by id
export const organizationWorkflowGetByIdRequest = (request: IOrganizationWorkflowByIdRequest) => action(OrganizationWorkflowAction.GET_BY_ID_REQUEST, request);
export const organizationWorkflowGetByIdSuccess = (response: IResponseSingle<IWorkflow>) => action(OrganizationWorkflowAction.GET_BY_ID_SUCCESS, response);
export const organizationWorkflowGetByIdError = (error: any) => action(OrganizationWorkflowAction.GET_BY_ID_ERROR, error);
export const organizationWorkflowGetByIdDispose = () => action(OrganizationWorkflowAction.GET_BY_ID_DISPOSE);

// get by menu
export const organizationWorkflowGetByMenuRequest = (request: IOrganizationWorkflowMenuRequest) => action(OrganizationWorkflowAction.GET_BY_MENU_REQUEST, request);
export const organizationWorkflowGetByMenuSuccess = (response: IResponseSingle<IWorkflowMenu>) => action(OrganizationWorkflowAction.GET_BY_MENU_SUCCESS, response);
export const organizationWorkflowGetByMenuError = (error: any) => action(OrganizationWorkflowAction.GET_BY_MENU_ERROR, error);
export const organizationWorkflowGetByMenuDispose = () => action(OrganizationWorkflowAction.GET_BY_MENU_DISPOSE);

// post
export const organizationWorkflowPostRequest = (request: IOrganizationWorkflowPostRequest) => action(OrganizationWorkflowAction.POST_REQUEST, request);
export const organizationWorkflowPostSuccess = (response: IResponseSingle<IWorkflow>) => action(OrganizationWorkflowAction.POST_SUCCESS, response);
export const organizationWorkflowPostError = (error: any) => action(OrganizationWorkflowAction.POST_ERROR, error);
export const organizationWorkflowPostDispose = () => action(OrganizationWorkflowAction.POST_DISPOSE);

// put
export const organizationWorkflowPutRequest = (request: IOrganizationWorkflowPutRequest) => action(OrganizationWorkflowAction.PUT_REQUEST, request);
export const organizationWorkflowPutSuccess = (response: IResponseSingle<IWorkflow>) => action(OrganizationWorkflowAction.PUT_SUCCESS, response);
export const organizationWorkflowPutError = (error: any) => action(OrganizationWorkflowAction.PUT_ERROR, error);
export const organizationWorkflowPutDispose = () => action(OrganizationWorkflowAction.PUT_DISPOSE);

// delete
export const organizationWorkflowDeleteRequest = (request: IOrganizationWorkflowDeleteRequest) => action(OrganizationWorkflowAction.DELETE_REQUEST, request);
export const organizationWorkflowDeleteSuccess = (response: boolean) => action(OrganizationWorkflowAction.DELETE_SUCCESS, response);
export const organizationWorkflowDeleteError = (error: any) => action(OrganizationWorkflowAction.DELETE_ERROR, error);
export const organizationWorkflowDeleteDispose = () => action(OrganizationWorkflowAction.DELETE_DISPOSE);