import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCornerBlogGetAllByCategoryRequest, 
  IHrCornerBlogGetAllRequest, 
  IHrCornerBlogGetDetailRequest,
} from 'modules/hr/classes/queries';
import { IHrCornerBlog, IHrCornerBlogCategory, IHrCornerBlogDetail } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCornerBlogAction {
  GET_ALL_REQUEST = '@@hr/corner/blog/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/corner/blog/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/corner/blog/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/corner/blog/GET_ALL_DISPOSE',
  GET_ALL_BY_CATEGORY_REQUEST = '@@hr/corner/blog/GET_ALL_BY_CATEGORY_REQUEST',
  GET_ALL_BY_CATEGORY_SUCCESS = '@@hr/corner/blog/GET_ALL_BY_CATEGORY_SUCCESS',
  GET_ALL_BY_CATEGORY_ERROR = '@@hr/corner/blog/GET_ALL_BY_CATEGORY_ERROR',
  GET_ALL_BY_CATEGORY_DISPOSE = '@@hr/corner/blog/GET_ALL_BY_CATEGORY_DISPOSE',
  GET_LATEST_BY_CATEGORY_REQUEST = '@@hr/corner/blog/GET_LATEST_BY_CATEGORY_REQUEST',
  GET_LATEST_BY_CATEGORY_SUCCESS = '@@hr/corner/blog/GET_LATEST_BY_CATEGORY_SUCCESS',
  GET_LATEST_BY_CATEGORY_ERROR = '@@hr/corner/blog/GET_LATEST_BY_CATEGORY_ERROR',
  GET_LATEST_BY_CATEGORY_DISPOSE = '@@hr/corner/blog/GET_LATEST_BY_CATEGORY_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/corner/blog/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/corner/blog/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/corner/blog/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/corner/blog/GET_BY_ID_DISPOSE'
}

// get all
export const hrCornerBlogGetAllRequest = (request: IHrCornerBlogGetAllRequest) => action(HrCornerBlogAction.GET_ALL_REQUEST, request);
export const hrCornerBlogGetAllSuccess = (response: IResponseCollection<IHrCornerBlog>) => action(HrCornerBlogAction.GET_ALL_SUCCESS, response);
export const hrCornerBlogGetAllError = (error: any) => action(HrCornerBlogAction.GET_ALL_ERROR, error);
export const hrCornerBlogGetAllDispose = () => action(HrCornerBlogAction.GET_ALL_DISPOSE);

// get all by category
export const hrCornerBlogGetAllByCategoryRequest = (request: IHrCornerBlogGetAllByCategoryRequest) => action(HrCornerBlogAction.GET_ALL_BY_CATEGORY_REQUEST, request);
export const hrCornerBlogGetAllByCategorySuccess = (response: IResponseCollection<IHrCornerBlogCategory>) => action(HrCornerBlogAction.GET_ALL_BY_CATEGORY_SUCCESS, response);
export const hrCornerBlogGetAllByCategoryError = (error: any) => action(HrCornerBlogAction.GET_ALL_BY_CATEGORY_ERROR, error);
export const hrCornerBlogGetAllByCategoryDispose = () => action(HrCornerBlogAction.GET_ALL_BY_CATEGORY_DISPOSE);

// get latest by category
export const hrCornerBlogGetLatestByCategoryRequest = (request: IHrCornerBlogGetAllByCategoryRequest) => action(HrCornerBlogAction.GET_LATEST_BY_CATEGORY_REQUEST, request);
export const hrCornerBlogGetLatestByCategorySuccess = (response: IResponseCollection<IHrCornerBlogCategory>) => action(HrCornerBlogAction.GET_LATEST_BY_CATEGORY_SUCCESS, response);
export const hrCornerBlogGetLatestByCategoryError = (error: any) => action(HrCornerBlogAction.GET_LATEST_BY_CATEGORY_ERROR, error);
export const hrCornerBlogGetLatestByCategoryDispose = () => action(HrCornerBlogAction.GET_LATEST_BY_CATEGORY_DISPOSE);

// get by id
export const hrCornerBlogGetByIdRequest = (request: IHrCornerBlogGetDetailRequest) => action(HrCornerBlogAction.GET_BY_ID_REQUEST, request);
export const hrCornerBlogGetByIdSuccess = (response: IResponseSingle<IHrCornerBlogDetail>) => action(HrCornerBlogAction.GET_BY_ID_SUCCESS, response);
export const hrCornerBlogGetByIdError = (error: any) => action(HrCornerBlogAction.GET_BY_ID_ERROR, error);
export const hrCornerBlogGetByIdDispose = () => action(HrCornerBlogAction.GET_BY_ID_DISPOSE);