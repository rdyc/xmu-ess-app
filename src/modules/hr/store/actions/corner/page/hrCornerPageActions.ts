import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCornerPageDeleteRequest, 
  IHrCornerPageGetAllRequest, 
  IHrCornerPageGetDetailRequest, 
  IHrCornerPagePostRequest, 
  IHrCornerPagePutRequest
} from 'modules/hr/classes/queries';
import { IHrCornerPage, IHrCornerPageDetail } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCornerPageAction {
  GET_ALL_REQUEST = '@@hr/corner/page/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/corner/page/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/corner/page/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/corner/page/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/corner/page/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/corner/page/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/corner/page/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/corner/page/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/corner/page/POST_REQUEST',
  POST_SUCCESS = '@@hr/corner/page/POST_SUCCESS',
  POST_ERROR = '@@hr/corner/page/POST_ERROR',
  POST_DISPOSE = '@@hr/corner/page/POST_DISPOSE',
  PUT_REQUEST = '@@hr/corner/page/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/corner/page/PUT_SUCCESS',
  PUT_ERROR = '@@hr/corner/page/PUT_ERROR',
  PUT_DISPOSE = '@@hr/corner/page/PUT_DISPOSE',
  DELETE_REQUEST = '@@hr/corner/page/DELETE_REQUEST',
  DELETE_SUCCESS = '@@hr/corner/page/DELETE_SUCCESS',
  DELETE_ERROR = '@@hr/corner/page/DELETE_ERROR',
  DELETE_DISPOSE = '@@hr/corner/page/DELETE_DISPOSE',
}

// get all
export const hrCornerPageGetAllRequest = (request: IHrCornerPageGetAllRequest) => action(HrCornerPageAction.GET_ALL_REQUEST, request);
export const hrCornerPageGetAllSuccess = (response: IResponseCollection<IHrCornerPage>) => action(HrCornerPageAction.GET_ALL_SUCCESS, response);
export const hrCornerPageGetAllError = (error: any) => action(HrCornerPageAction.GET_ALL_ERROR, error);
export const hrCornerPageGetAllDispose = () => action(HrCornerPageAction.GET_ALL_DISPOSE);

// get by id
export const hrCornerPageGetByIdRequest = (request: IHrCornerPageGetDetailRequest) => action(HrCornerPageAction.GET_BY_ID_REQUEST, request);
export const hrCornerPageGetByIdSuccess = (response: IResponseSingle<IHrCornerPageDetail>) => action(HrCornerPageAction.GET_BY_ID_SUCCESS, response);
export const hrCornerPageGetByIdError = (error: any) => action(HrCornerPageAction.GET_BY_ID_ERROR, error);
export const hrCornerPageGetByIdDispose = () => action(HrCornerPageAction.GET_BY_ID_DISPOSE);

// post
export const hrCornerPagePostRequest = (request: IHrCornerPagePostRequest) => action(HrCornerPageAction.POST_REQUEST, request);
export const hrCornerPagePostSuccess = (response: IResponseSingle<IHrCornerPage>) => action(HrCornerPageAction.POST_SUCCESS, response);
export const hrCornerPagePostError = (error: any) => action(HrCornerPageAction.POST_ERROR, error);
export const hrCornerPagePostDispose = () => action(HrCornerPageAction.POST_DISPOSE);

// put
export const hrCornerPagePutRequest = (request: IHrCornerPagePutRequest) => action(HrCornerPageAction.PUT_REQUEST, request);
export const hrCornerPagePutSuccess = (response: IResponseSingle<IHrCornerPage>) => action(HrCornerPageAction.PUT_SUCCESS, response);
export const hrCornerPagePutError = (error: any) => action(HrCornerPageAction.PUT_ERROR, error);
export const hrCornerPagePutDispose = () => action(HrCornerPageAction.PUT_DISPOSE);

// delete
export const hrCornerPageDeleteRequest = (request: IHrCornerPageDeleteRequest) => action(HrCornerPageAction.DELETE_REQUEST, request);
export const hrCornerPageDeleteSuccess = (response: boolean) => action(HrCornerPageAction.DELETE_SUCCESS, response);
export const hrCornerPageDeleteError = (error: any) => action(HrCornerPageAction.DELETE_ERROR, error);
export const hrCornerPageDeleteDispose = () => action(HrCornerPageAction.DELETE_DISPOSE);