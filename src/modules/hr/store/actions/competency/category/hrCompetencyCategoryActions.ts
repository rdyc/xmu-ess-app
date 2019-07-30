import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHrCompetencyCategoryGetAllRequest, IHrCompetencyCategoryGetDetailRequest, IHrCompetencyCategoryGetListRequest, IHrCompetencyCategoryPostRequest, IHrCompetencyCategoryPutRequest } from 'modules/hr/classes/queries';
import { IHrCompetencyCategory, IHrCompetencyCategoryDetail, IHrCompetencyCategoryList } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyCategoryAction {
  GET_ALL_REQUEST = '@@hr/competency/category/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/category/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/category/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/category/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/category/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/category/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/category/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/category/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/category/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/category/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/category/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/category/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/category/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/category/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/category/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/category/POST_DISPOSE',
  PUT_REQUEST = '@@hr/competency/category/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/competency/category/PUT_SUCCESS',
  PUT_ERROR = '@@hr/competency/category/PUT_ERROR',
  PUT_DISPOSE = '@@hr/competency/category/DELETE_DISPOSE',
}

// get all
export const hrCompetencyCategoryGetAllRequest = (request: IHrCompetencyCategoryGetAllRequest) => action(HrCompetencyCategoryAction.GET_ALL_REQUEST, request);
export const hrCompetencyCategoryGetAllSuccess = (response: IResponseCollection<IHrCompetencyCategory>) => action(HrCompetencyCategoryAction.GET_ALL_SUCCESS, response);
export const hrCompetencyCategoryGetAllError = (error: any) => action(HrCompetencyCategoryAction.GET_ALL_ERROR, error);
export const hrCompetencyCategoryGetAllDispose = () => action(HrCompetencyCategoryAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyCategoryGetListRequest = (request: IHrCompetencyCategoryGetListRequest) => action(HrCompetencyCategoryAction.GET_LIST_REQUEST, request);
export const hrCompetencyCategoryGetListSuccess = (response: IResponseCollection<IHrCompetencyCategoryList>) => action(HrCompetencyCategoryAction.GET_LIST_SUCCESS, response);
export const hrCompetencyCategoryGetListError = (error: any) => action(HrCompetencyCategoryAction.GET_LIST_ERROR, error);
export const hrCompetencyCategoryGetListDispose = () => action(HrCompetencyCategoryAction.GET_LIST_DISPOSE);

// get by id
export const hrCompetencyCategoryGetByIdRequest = (request: IHrCompetencyCategoryGetDetailRequest) => action(HrCompetencyCategoryAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyCategoryGetByIdSuccess = (response: IResponseCollection<IHrCompetencyCategoryDetail>) => action(HrCompetencyCategoryAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyCategoryGetByIdError = (error: any) => action(HrCompetencyCategoryAction.GET_BY_ID_ERROR, error);
export const hrCompetencyCategoryGetByIdDispose = () => action(HrCompetencyCategoryAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyCategoryPostRequest = (request: IHrCompetencyCategoryPostRequest) => action(HrCompetencyCategoryAction.POST_REQUEST, request);
export const hrCompetencyCategoryPostSuccess = (response: IResponseSingle<IHrCompetencyCategory>) => action(HrCompetencyCategoryAction.POST_SUCCESS, response);
export const hrCompetencyCategoryPostError = (error: any) => action(HrCompetencyCategoryAction.POST_ERROR, error);
export const hrCompetencyCategoryPostDispose = () => action(HrCompetencyCategoryAction.POST_DISPOSE);

// put
export const hrCompetencyCategoryPutRequest = (request: IHrCompetencyCategoryPutRequest) => action(HrCompetencyCategoryAction.PUT_REQUEST, request);
export const hrCompetencyCategoryPutSuccess = (response: IResponseSingle<IHrCompetencyCategory>) => action(HrCompetencyCategoryAction.PUT_SUCCESS, response);
export const hrCompetencyCategoryPutError = (error: any) => action(HrCompetencyCategoryAction.PUT_ERROR, error);
export const hrCompetencyCategoryPutDispose = () => action(HrCompetencyCategoryAction.PUT_DISPOSE);