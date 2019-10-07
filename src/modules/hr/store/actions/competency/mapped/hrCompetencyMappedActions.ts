import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHrCompetencyMappedGetAllRequest, IHrCompetencyMappedGetDetailRequest, IHrCompetencyMappedGetListRequest, IHrCompetencyMappedGetNextRequest, IHrCompetencyMappedPostRequest, IHrCompetencyMappedPutRequest } from 'modules/hr/classes/queries';
import { IHrCompetencyMapped, IHrCompetencyMappedDetail, IHrCompetencyMappedList, IHrCompetencyMappedNext } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyMappedAction {
  GET_ALL_REQUEST = '@@hr/competency/mapped/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/mapped/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/mapped/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/mapped/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/mapped/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/mapped/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/mapped/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/mapped/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/mapped/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/mapped/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/mapped/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/mapped/GET_BY_ID_DISPOSE',
  GET_NEXT_REQUEST = '@@hr/competency/mapped/GET_NEXT_REQUEST',
  GET_NEXT_SUCCESS = '@@hr/competency/mapped/GET_NEXT_SUCCESS',
  GET_NEXT_ERROR = '@@hr/competency/mapped/GET_NEXT_ERROR',
  GET_NEXT_DISPOSE = '@@hr/competency/mapped/GET_NEXT_DISPOSE',
  GET_CURRENT_REQUEST = '@@hr/competency/mapped/GET_CURRENT_REQUEST',
  GET_CURRENT_SUCCESS = '@@hr/competency/mapped/GET_CURRENT_SUCCESS',
  GET_CURRENT_ERROR = '@@hr/competency/mapped/GET_CURRENT_ERROR',
  GET_CURRENT_DISPOSE = '@@hr/competency/mapped/GET_CURRENT_DISPOSE',
  POST_REQUEST = '@@hr/competency/mapped/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/mapped/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/mapped/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/mapped/POST_DISPOSE',
  PUT_REQUEST = '@@hr/competency/mapped/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/competency/mapped/PUT_SUCCESS',
  PUT_ERROR = '@@hr/competency/mapped/PUT_ERROR',
  PUT_DISPOSE = '@@hr/competency/mapped/PUT_DISPOSE',
}

// get all
export const hrCompetencyMappedGetAllRequest = (request: IHrCompetencyMappedGetAllRequest) => action(HrCompetencyMappedAction.GET_ALL_REQUEST, request);
export const hrCompetencyMappedGetAllSuccess = (response: IResponseCollection<IHrCompetencyMapped>) => action(HrCompetencyMappedAction.GET_ALL_SUCCESS, response);
export const hrCompetencyMappedGetAllError = (error: any) => action(HrCompetencyMappedAction.GET_ALL_ERROR, error);
export const hrCompetencyMappedGetAllDispose = () => action(HrCompetencyMappedAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyMappedGetListRequest = (request: IHrCompetencyMappedGetListRequest) => action(HrCompetencyMappedAction.GET_LIST_REQUEST, request);
export const hrCompetencyMappedGetListSuccess = (response: IResponseCollection<IHrCompetencyMappedList>) => action(HrCompetencyMappedAction.GET_LIST_SUCCESS, response);
export const hrCompetencyMappedGetListError = (error: any) => action(HrCompetencyMappedAction.GET_LIST_ERROR, error);
export const hrCompetencyMappedGetListDispose = () => action(HrCompetencyMappedAction.GET_LIST_DISPOSE);

// get next
export const hrCompetencyMappedGetNextRequest = (request: IHrCompetencyMappedGetNextRequest) => action(HrCompetencyMappedAction.GET_NEXT_REQUEST, request);
export const hrCompetencyMappedGetNextSuccess = (response: IResponseCollection<IHrCompetencyMappedNext>) => action(HrCompetencyMappedAction.GET_NEXT_SUCCESS, response);
export const hrCompetencyMappedGetNextError = (error: any) => action(HrCompetencyMappedAction.GET_NEXT_ERROR, error);
export const hrCompetencyMappedGetNextDispose = () => action(HrCompetencyMappedAction.GET_NEXT_DISPOSE);

// get current
export const hrCompetencyMappedGetCurrentRequest = (request: IHrCompetencyMappedGetNextRequest) => action(HrCompetencyMappedAction.GET_CURRENT_REQUEST, request);
export const hrCompetencyMappedGetCurrentSuccess = (response: IResponseCollection<IHrCompetencyMappedNext>) => action(HrCompetencyMappedAction.GET_CURRENT_SUCCESS, response);
export const hrCompetencyMappedGetCurrentError = (error: any) => action(HrCompetencyMappedAction.GET_CURRENT_ERROR, error);
export const hrCompetencyMappedGetCurrentDispose = () => action(HrCompetencyMappedAction.GET_CURRENT_DISPOSE);

// get by id
export const hrCompetencyMappedGetByIdRequest = (request: IHrCompetencyMappedGetDetailRequest) => action(HrCompetencyMappedAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyMappedGetByIdSuccess = (response: IResponseSingle<IHrCompetencyMappedDetail>) => action(HrCompetencyMappedAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyMappedGetByIdError = (error: any) => action(HrCompetencyMappedAction.GET_BY_ID_ERROR, error);
export const hrCompetencyMappedGetByIdDispose = () => action(HrCompetencyMappedAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyMappedPostRequest = (request: IHrCompetencyMappedPostRequest) => action(HrCompetencyMappedAction.POST_REQUEST, request);
export const hrCompetencyMappedPostSuccess = (response: IResponseSingle<IHrCompetencyMapped>) => action(HrCompetencyMappedAction.POST_SUCCESS, response);
export const hrCompetencyMappedPostError = (error: any) => action(HrCompetencyMappedAction.POST_ERROR, error);
export const hrCompetencyMappedPostDispose = () => action(HrCompetencyMappedAction.POST_DISPOSE);

// put
export const hrCompetencyMappedPutRequest = (request: IHrCompetencyMappedPutRequest) => action(HrCompetencyMappedAction.PUT_REQUEST, request);
export const hrCompetencyMappedPutSuccess = (response: IResponseSingle<IHrCompetencyMapped>) => action(HrCompetencyMappedAction.PUT_SUCCESS, response);
export const hrCompetencyMappedPutError = (error: any) => action(HrCompetencyMappedAction.PUT_ERROR, error);
export const hrCompetencyMappedPutDispose = () => action(HrCompetencyMappedAction.PUT_DISPOSE);