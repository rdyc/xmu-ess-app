import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCornerCategoryDeleteRequest, 
  IHrCornerCategoryGetAllRequest, 
  IHrCornerCategoryGetDetailRequest, 
  IHrCornerCategoryGetListRequest, 
  IHrCornerCategoryPostRequest,
  IHrCornerCategoryPutRequest
} from 'modules/hr/classes/queries';
import { IHrCornerCategory, IHrCornerCategoryDetail, IHrCornerCategoryList } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCornerCategoryAction {
  GET_ALL_REQUEST = '@@hr/corner/category/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/corner/category/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/corner/category/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/corner/category/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/corner/page/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/corner/page/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/corner/page/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/corner/page/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/corner/category/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/corner/category/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/corner/category/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/corner/category/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/corner/category/POST_REQUEST',
  POST_SUCCESS = '@@hr/corner/category/POST_SUCCESS',
  POST_ERROR = '@@hr/corner/category/POST_ERROR',
  POST_DISPOSE = '@@hr/corner/category/POST_DISPOSE',
  PUT_REQUEST = '@@hr/corner/category/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/corner/category/PUT_SUCCESS',
  PUT_ERROR = '@@hr/corner/category/PUT_ERROR',
  PUT_DISPOSE = '@@hr/corner/category/PUT_DISPOSE',
  DELETE_REQUEST = '@@hr/corner/category/DELETE_REQUEST',
  DELETE_SUCCESS = '@@hr/corner/category/DELETE_SUCCESS',
  DELETE_ERROR = '@@hr/corner/category/DELETE_ERROR',
  DELETE_DISPOSE = '@@hr/corner/category/DELETE_DISPOSE',
}

// get all
export const hrCornerCategoryGetAllRequest = (request: IHrCornerCategoryGetAllRequest) => action(HrCornerCategoryAction.GET_ALL_REQUEST, request);
export const hrCornerCategoryGetAllSuccess = (response: IResponseCollection<IHrCornerCategory>) => action(HrCornerCategoryAction.GET_ALL_SUCCESS, response);
export const hrCornerCategoryGetAllError = (error: any) => action(HrCornerCategoryAction.GET_ALL_ERROR, error);
export const hrCornerCategoryGetAllDispose = () => action(HrCornerCategoryAction.GET_ALL_DISPOSE);

// get list
export const hrCornerCategoryGetListRequest = (request: IHrCornerCategoryGetListRequest) => action(HrCornerCategoryAction.GET_LIST_REQUEST, request);
export const hrCornerCategoryGetListSuccess = (response: IResponseCollection<IHrCornerCategoryList>) => action(HrCornerCategoryAction.GET_LIST_SUCCESS, response);
export const hrCornerCategoryGetListError = (error: any) => action(HrCornerCategoryAction.GET_LIST_ERROR, error);
export const hrCornerCategoryGetListDispose = () => action(HrCornerCategoryAction.GET_LIST_DISPOSE);

// get by id
export const hrCornerCategoryGetByIdRequest = (request: IHrCornerCategoryGetDetailRequest) => action(HrCornerCategoryAction.GET_BY_ID_REQUEST, request);
export const hrCornerCategoryGetByIdSuccess = (response: IResponseSingle<IHrCornerCategoryDetail>) => action(HrCornerCategoryAction.GET_BY_ID_SUCCESS, response);
export const hrCornerCategoryGetByIdError = (error: any) => action(HrCornerCategoryAction.GET_BY_ID_ERROR, error);
export const hrCornerCategoryGetByIdDispose = () => action(HrCornerCategoryAction.GET_BY_ID_DISPOSE);

// post
export const hrCornerCategoryPostRequest = (request: IHrCornerCategoryPostRequest) => action(HrCornerCategoryAction.POST_REQUEST, request);
export const hrCornerCategoryPostSuccess = (response: IResponseSingle<IHrCornerCategory>) => action(HrCornerCategoryAction.POST_SUCCESS, response);
export const hrCornerCategoryPostError = (error: any) => action(HrCornerCategoryAction.POST_ERROR, error);
export const hrCornerCategoryPostDispose = () => action(HrCornerCategoryAction.POST_DISPOSE);

// put
export const hrCornerCategoryPutRequest = (request: IHrCornerCategoryPutRequest) => action(HrCornerCategoryAction.PUT_REQUEST, request);
export const hrCornerCategoryPutSuccess = (response: IResponseSingle<IHrCornerCategory>) => action(HrCornerCategoryAction.PUT_SUCCESS, response);
export const hrCornerCategoryPutError = (error: any) => action(HrCornerCategoryAction.PUT_ERROR, error);
export const hrCornerCategoryPutDispose = () => action(HrCornerCategoryAction.PUT_DISPOSE);

// delete
export const hrCornerCategoryDeleteRequest = (request: IHrCornerCategoryDeleteRequest) => action(HrCornerCategoryAction.DELETE_REQUEST, request);
export const hrCornerCategoryDeleteSuccess = (response: boolean) => action(HrCornerCategoryAction.DELETE_SUCCESS, response);
export const hrCornerCategoryDeleteError = (error: any) => action(HrCornerCategoryAction.DELETE_ERROR, error);
export const hrCornerCategoryDeleteDispose = () => action(HrCornerCategoryAction.DELETE_DISPOSE);