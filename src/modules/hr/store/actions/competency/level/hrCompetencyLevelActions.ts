import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHrCompetencyLevelGetAllRequest, IHrCompetencyLevelGetDetailRequest, IHrCompetencyLevelGetListRequest, IHrCompetencyLevelPostRequest, IHrCompetencyLevelPutRequest } from 'modules/hr/classes/queries';
import { IHrCompetencyLevel, IHrCompetencyLevelDetail, IHrCompetencyLevelList } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyLevelAction {
  GET_ALL_REQUEST = '@@hr/competency/level/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/level/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/level/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/level/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/level/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/level/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/level/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/level/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/level/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/level/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/level/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/level/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/level/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/level/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/level/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/level/POST_DISPOSE',
  PUT_REQUEST = '@@hr/competency/level/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/competency/level/PUT_SUCCESS',
  PUT_ERROR = '@@hr/competency/level/PUT_ERROR',
  PUT_DISPOSE = '@@hr/competency/level/DELETE_DISPOSE',
}

// get all
export const hrCompetencyLevelGetAllRequest = (request: IHrCompetencyLevelGetAllRequest) => action(HrCompetencyLevelAction.GET_ALL_REQUEST, request);
export const hrCompetencyLevelGetAllSuccess = (response: IResponseCollection<IHrCompetencyLevel>) => action(HrCompetencyLevelAction.GET_ALL_SUCCESS, response);
export const hrCompetencyLevelGetAllError = (error: any) => action(HrCompetencyLevelAction.GET_ALL_ERROR, error);
export const hrCompetencyLevelGetAllDispose = () => action(HrCompetencyLevelAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyLevelGetListRequest = (request: IHrCompetencyLevelGetListRequest) => action(HrCompetencyLevelAction.GET_LIST_REQUEST, request);
export const hrCompetencyLevelGetListSuccess = (response: IResponseCollection<IHrCompetencyLevelList>) => action(HrCompetencyLevelAction.GET_LIST_SUCCESS, response);
export const hrCompetencyLevelGetListError = (error: any) => action(HrCompetencyLevelAction.GET_LIST_ERROR, error);
export const hrCompetencyLevelGetListDispose = () => action(HrCompetencyLevelAction.GET_LIST_DISPOSE);

// get by id
export const hrCompetencyLevelGetByIdRequest = (request: IHrCompetencyLevelGetDetailRequest) => action(HrCompetencyLevelAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyLevelGetByIdSuccess = (response: IResponseCollection<IHrCompetencyLevelDetail>) => action(HrCompetencyLevelAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyLevelGetByIdError = (error: any) => action(HrCompetencyLevelAction.GET_BY_ID_ERROR, error);
export const hrCompetencyLevelGetByIdDispose = () => action(HrCompetencyLevelAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyLevelPostRequest = (request: IHrCompetencyLevelPostRequest) => action(HrCompetencyLevelAction.POST_REQUEST, request);
export const hrCompetencyLevelPostSuccess = (response: IResponseSingle<IHrCompetencyLevel>) => action(HrCompetencyLevelAction.POST_SUCCESS, response);
export const hrCompetencyLevelPostError = (error: any) => action(HrCompetencyLevelAction.POST_ERROR, error);
export const hrCompetencyLevelPostDispose = () => action(HrCompetencyLevelAction.POST_DISPOSE);

// put
export const hrCompetencyLevelPutRequest = (request: IHrCompetencyLevelPutRequest) => action(HrCompetencyLevelAction.PUT_REQUEST, request);
export const hrCompetencyLevelPutSuccess = (response: IResponseSingle<IHrCompetencyLevel>) => action(HrCompetencyLevelAction.PUT_SUCCESS, response);
export const hrCompetencyLevelPutError = (error: any) => action(HrCompetencyLevelAction.PUT_ERROR, error);
export const hrCompetencyLevelPutDispose = () => action(HrCompetencyLevelAction.PUT_DISPOSE);