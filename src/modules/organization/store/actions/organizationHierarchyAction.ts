import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IOrganizationHierarchyAllRequest, 
  IOrganizationHierarchyByIdRequest, 
  IOrganizationHierarchyDeleteRequest, 
  IOrganizationHierarchyListRequest, 
  IOrganizationHierarchyPostRequest, 
  IOrganizationHierarchyPutRequest 
} from '@organization/classes/queries/hierarchy';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';
import { action } from 'typesafe-actions';

export const enum OrganizationHierarchyAction {
  GET_ALL_REQUEST = '@@organization/hierarchy/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@organization/hierarchy/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@organization/hierarchy/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@organization/hierarchy/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@organization/hierarchy/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@organization/hierarchy/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@organization/hierarchy/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@organization/hierarchy/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@organization/hierarchy/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@organization/hierarchy/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@organization/hierarchy/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@organization/hierarchy/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@organization/hierarchy/POST_REQUEST',
  POST_SUCCESS = '@@organization/hierarchy/POST_SUCCESS',
  POST_ERROR = '@@organization/hierarchy/POST_ERROR',
  POST_DISPOSE = '@@organization/hierarchy/POST_DISPOSE',
  PUT_REQUEST = '@@organization/hierarchy/PUT_REQUEST',
  PUT_SUCCESS = '@@organization/hierarchy/PUT_SUCCESS',
  PUT_ERROR = '@@organization/hierarchy/PUT_ERROR',
  PUT_DISPOSE = '@@organization/hierarchy/DELETE_DISPOSE',
  DELETE_REQUEST = '@@organization/hierarchy/DELETE_REQUEST',
  DELETE_SUCCESS = '@@organization/hierarchy/DELETE_SUCCESS',
  DELETE_ERROR = '@@organization/hierarchy/DELETE_ERROR',
  DELETE_DISPOSE = '@@organization/hierarchy/DELETE_DISPOSE',
}

// get all
export const organizationHierarchyGetAllRequest = (request: IOrganizationHierarchyAllRequest) => action(OrganizationHierarchyAction.GET_ALL_REQUEST, request);
export const organizationHierarchyGetAllSuccess = (response: IResponseCollection<IHierarchy>) => action(OrganizationHierarchyAction.GET_ALL_SUCCESS, response);
export const organizationHierarchyGetAllError = (error: any) => action(OrganizationHierarchyAction.GET_ALL_ERROR, error);
export const organizationHierarchyGetAllDispose = () => action(OrganizationHierarchyAction.GET_ALL_DISPOSE);

// get list
export const organizationHierarchyGetListRequest = (request: IOrganizationHierarchyListRequest) => action(OrganizationHierarchyAction.GET_LIST_REQUEST, request);
export const organizationHierarchyGetListSuccess = (response: IResponseCollection<IHierarchyList>) => action(OrganizationHierarchyAction.GET_LIST_SUCCESS, response);
export const organizationHierarchyGetListError = (error: any) => action(OrganizationHierarchyAction.GET_LIST_ERROR, error);
export const organizationHierarchyGetListDispose = () => action(OrganizationHierarchyAction.GET_LIST_DISPOSE);

// get by id
export const organizationHierarchyGetByIdRequest = (request: IOrganizationHierarchyByIdRequest) => action(OrganizationHierarchyAction.GET_BY_ID_REQUEST, request);
export const organizationHierarchyGetByIdSuccess = (response: IResponseCollection<IHierarchyDetail>) => action(OrganizationHierarchyAction.GET_BY_ID_SUCCESS, response);
export const organizationHierarchyGetByIdError = (error: any) => action(OrganizationHierarchyAction.GET_BY_ID_ERROR, error);
export const organizationHierarchyGetByIdDispose = () => action(OrganizationHierarchyAction.GET_BY_ID_DISPOSE);

// post
export const organizationHierarchyPostRequest = (request: IOrganizationHierarchyPostRequest) => action(OrganizationHierarchyAction.POST_REQUEST, request);
export const organizationHierarchyPostSuccess = (response: IResponseSingle<IHierarchy>) => action(OrganizationHierarchyAction.POST_SUCCESS, response);
export const organizationHierarchyPostError = (error: any) => action(OrganizationHierarchyAction.POST_ERROR, error);
export const organizationHierarchyPostDispose = () => action(OrganizationHierarchyAction.POST_DISPOSE);

// put
export const organizationHierarchyPutRequest = (request: IOrganizationHierarchyPutRequest) => action(OrganizationHierarchyAction.PUT_REQUEST, request);
export const organizationHierarchyPutSuccess = (response: IResponseSingle<IHierarchy>) => action(OrganizationHierarchyAction.PUT_SUCCESS, response);
export const organizationHierarchyPutError = (error: any) => action(OrganizationHierarchyAction.PUT_ERROR, error);
export const organizationHierarchyPutDispose = () => action(OrganizationHierarchyAction.PUT_DISPOSE);

// delete
export const organizationHierarchyDeleteRequest = (request: IOrganizationHierarchyDeleteRequest) => action(OrganizationHierarchyAction.DELETE_REQUEST, request);
export const organizationHierarchyDeleteSuccess = (response: boolean) => action(OrganizationHierarchyAction.DELETE_SUCCESS, response);
export const organizationHierarchyDeleteError = (error: any) => action(OrganizationHierarchyAction.DELETE_ERROR, error);
export const organizationHierarchyDeleteDispose = () => action(OrganizationHierarchyAction.DELETE_DISPOSE);