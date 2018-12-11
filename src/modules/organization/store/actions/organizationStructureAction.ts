import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IOrganizationStructureAllRequest, 
  IOrganizationStructureByIdRequest, 
  IOrganizationStructureDeleteRequest,
  IOrganizationStructurePostRequest, 
  IOrganizationStructurePutRequest 
} from '@organization/classes/queries/structure';
import { IStructure, IStructureDetail } from '@organization/classes/response/structure';
import { action } from 'typesafe-actions';

export const enum OrganizationStructureAction {
  GET_ALL_REQUEST = '@@organization/structure/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@organization/structure/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@organization/structure/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@organization/structure/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@organization/structure/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@organization/structure/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@organization/structure/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@organization/structure/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@organization/structure/POST_REQUEST',
  POST_SUCCESS = '@@organization/structure/POST_SUCCESS',
  POST_ERROR = '@@organization/structure/POST_ERROR',
  POST_DISPOSE = '@@organization/structure/POST_DISPOSE',
  PUT_REQUEST = '@@organization/structure/PUT_REQUEST',
  PUT_SUCCESS = '@@organization/structure/PUT_SUCCESS',
  PUT_ERROR = '@@organization/structure/PUT_ERROR',
  PUT_DISPOSE = '@@organization/structure/DELETE_DISPOSE',
  DELETE_REQUEST = '@@organization/structure/DELETE_REQUEST',
  DELETE_SUCCESS = '@@organization/structure/DELETE_SUCCESS',
  DELETE_ERROR = '@@organization/structure/DELETE_ERROR',
  DELETE_DISPOSE = '@@organization/structure/DELETE_DISPOSE',
}

// get all
export const organizationStructureGetAllRequest = (request: IOrganizationStructureAllRequest) => action(OrganizationStructureAction.GET_ALL_REQUEST, request);
export const organizationStructureGetAllSuccess = (response: IResponseCollection<IStructure>) => action(OrganizationStructureAction.GET_ALL_SUCCESS, response);
export const organizationStructureGetAllError = (message: string) => action(OrganizationStructureAction.GET_ALL_ERROR, message);
export const organizationStructureGetAllDispose = () => action(OrganizationStructureAction.GET_ALL_DISPOSE);

// get by id
export const organizationStructureGetByIdRequest = (request: IOrganizationStructureByIdRequest) => action(OrganizationStructureAction.GET_BY_ID_REQUEST, request);
export const organizationStructureGetByIdSuccess = (response: IResponseCollection<IStructureDetail>) => action(OrganizationStructureAction.GET_BY_ID_SUCCESS, response);
export const organizationStructureGetByIdError = (message: string) => action(OrganizationStructureAction.GET_BY_ID_ERROR, message);
export const organizationStructureGetByIdDispose = () => action(OrganizationStructureAction.GET_BY_ID_DISPOSE);

// post
export const organizationStructurePostRequest = (request: IOrganizationStructurePostRequest) => action(OrganizationStructureAction.POST_REQUEST, request);
export const organizationStructurePostSuccess = (response: IResponseSingle<IStructure>) => action(OrganizationStructureAction.POST_SUCCESS, response);
export const organizationStructurePostError = (message: string) => action(OrganizationStructureAction.POST_ERROR, message);
export const organizationStructurePostDispose = () => action(OrganizationStructureAction.POST_DISPOSE);

// put
export const organizationStructurePutRequest = (request: IOrganizationStructurePutRequest) => action(OrganizationStructureAction.PUT_REQUEST, request);
export const organizationStructurePutSuccess = (response: IResponseSingle<IStructure>) => action(OrganizationStructureAction.PUT_SUCCESS, response);
export const organizationStructurePutError = (message: string) => action(OrganizationStructureAction.PUT_ERROR, message);
export const organizationStructurePutDispose = () => action(OrganizationStructureAction.PUT_DISPOSE);

// delete
export const organizationStructureDeleteRequest = (request: IOrganizationStructureDeleteRequest) => action(OrganizationStructureAction.DELETE_REQUEST, request);
export const organizationStructureDeleteSuccess = (response: boolean) => action(OrganizationStructureAction.DELETE_SUCCESS, response);
export const organizationStructureDeleteError = (message: string) => action(OrganizationStructureAction.DELETE_ERROR, message);
export const organizationStructureDeleteDispose = () => action(OrganizationStructureAction.DELETE_DISPOSE);