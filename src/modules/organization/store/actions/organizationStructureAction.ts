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
  GET_ALL_STRUCTURE_REQUEST = '@@organization/structure/GET_ALL_REQUEST',
  GET_ALL_STRUCTURE_SUCCESS = '@@organization/structure/GET_ALL_SUCCESS',
  GET_ALL_STRUCTURE_ERROR = '@@organization/structure/GET_ALL_ERROR',
  GET_ALL_STRUCTURE_DISPOSE = '@@organization/structure/GET_ALL_DISPOSE',
  GET_BY_ID_STRUCTURE_REQUEST = '@@organization/structure/GET_BY_ID_REQUEST',
  GET_BY_ID_STRUCTURE_SUCCESS = '@@organization/structure/GET_BY_ID_SUCCESS',
  GET_BY_ID_STRUCTURE_ERROR = '@@organization/structure/GET_BY_ID_ERROR',
  GET_BY_ID_STRUCTURE_DISPOSE = '@@organization/structure/GET_BY_ID_DISPOSE',
  POST_STRUCTURE_REQUEST = '@@organization/structure/POST_REQUEST',
  POST_STRUCTURE_SUCCESS = '@@organization/structure/POST_SUCCESS',
  POST_STRUCTURE_ERROR = '@@organization/structure/POST_ERROR',
  POST_STRUCTURE_DISPOSE = '@@organization/structure/POST_DISPOSE',
  PUT_STRUCTURE_REQUEST = '@@organization/structure/PUT_REQUEST',
  PUT_STRUCTURE_SUCCESS = '@@organization/structure/PUT_SUCCESS',
  PUT_STRUCTURE_ERROR = '@@organization/structure/PUT_ERROR',
  PUT_STRUCTURE_DISPOSE = '@@organization/structure/DELETE_DISPOSE',
  DELETE_STRUCTURE_REQUEST = '@@organization/structure/DELETE_REQUEST',
  DELETE_STRUCTURE_SUCCESS = '@@organization/structure/DELETE_SUCCESS',
  DELETE_STRUCTURE_ERROR = '@@organization/structure/DELETE_ERROR',
  DELETE_STRUCTURE_DISPOSE = '@@organization/structure/DELETE_DISPOSE',
}

// get all
export const organizationStructureGetAllRequest = (request: IOrganizationStructureAllRequest) => action(OrganizationStructureAction.GET_ALL_STRUCTURE_REQUEST, request);
export const organizationStructureGetAllSuccess = (response: IResponseCollection<IStructure>) => action(OrganizationStructureAction.GET_ALL_STRUCTURE_SUCCESS, response);
export const organizationStructureGetAllError = (message: string) => action(OrganizationStructureAction.GET_ALL_STRUCTURE_ERROR, message);
export const organizationStructureGetAllDispose = () => action(OrganizationStructureAction.GET_ALL_STRUCTURE_DISPOSE);

// get by id
export const organizationStructureGetByIdRequest = (request: IOrganizationStructureByIdRequest) => action(OrganizationStructureAction.GET_BY_ID_STRUCTURE_REQUEST, request);
export const organizationStructureGetByIdSuccess = (response: IResponseSingle<IStructureDetail>) => action(OrganizationStructureAction.GET_BY_ID_STRUCTURE_SUCCESS, response);
export const organizationStructureGetByIdError = (message: string) => action(OrganizationStructureAction.GET_BY_ID_STRUCTURE_ERROR, message);
export const organizationStructureGetByIdDispose = () => action(OrganizationStructureAction.GET_BY_ID_STRUCTURE_DISPOSE);

// post
export const organizationStructurePostRequest = (request: IOrganizationStructurePostRequest) => action(OrganizationStructureAction.POST_STRUCTURE_REQUEST, request);
export const organizationStructurePostSuccess = (response: IResponseSingle<IStructure>) => action(OrganizationStructureAction.POST_STRUCTURE_SUCCESS, response);
export const organizationStructurePostError = (message: string) => action(OrganizationStructureAction.POST_STRUCTURE_ERROR, message);
export const organizationStructurePostDispose = () => action(OrganizationStructureAction.POST_STRUCTURE_DISPOSE);

// put
export const organizationStructurePutRequest = (request: IOrganizationStructurePutRequest) => action(OrganizationStructureAction.PUT_STRUCTURE_REQUEST, request);
export const organizationStructurePutSuccess = (response: IResponseSingle<IStructure>) => action(OrganizationStructureAction.PUT_STRUCTURE_SUCCESS, response);
export const organizationStructurePutError = (message: string) => action(OrganizationStructureAction.PUT_STRUCTURE_ERROR, message);
export const organizationStructurePutDispose = () => action(OrganizationStructureAction.PUT_STRUCTURE_DISPOSE);

// delete
export const organizationStructureDeleteRequest = (request: IOrganizationStructureDeleteRequest) => action(OrganizationStructureAction.DELETE_STRUCTURE_REQUEST, request);
export const organizationStructureDeleteSuccess = (response: boolean) => action(OrganizationStructureAction.DELETE_STRUCTURE_SUCCESS, response);
export const organizationStructureDeleteError = (message: string) => action(OrganizationStructureAction.DELETE_STRUCTURE_ERROR, message);
export const organizationStructureDeleteDispose = () => action(OrganizationStructureAction.DELETE_STRUCTURE_DISPOSE);