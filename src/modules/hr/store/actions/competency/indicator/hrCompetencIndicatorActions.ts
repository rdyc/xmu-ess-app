import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IHrCompetencyIndicatorGetAllRequest, IHrCompetencyIndicatorGetDetailRequest, IHrCompetencyIndicatorGetListRequest, IHrCompetencyIndicatorPostRequest, IHrCompetencyIndicatorPutRequest } from 'modules/hr/classes/queries';
import { IHrCompetencyIndicator, IHrCompetencyIndicatorDetail, IHrCompetencyIndicatorList } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyIndicatorAction {
  GET_ALL_REQUEST = '@@hr/competency/indicator/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/indicator/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/indicator/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/indicator/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/indicator/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/indicator/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/indicator/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/indicator/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/indicator/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/indicator/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/indicator/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/indicator/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/indicator/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/indicator/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/indicator/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/indicator/POST_DISPOSE',
  PUT_REQUEST = '@@hr/competency/indicator/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/competency/indicator/PUT_SUCCESS',
  PUT_ERROR = '@@hr/competency/indicator/PUT_ERROR',
  PUT_DISPOSE = '@@hr/competency/indicator/DELETE_DISPOSE',
}

// get all
export const hrCompetencyIndicatorGetAllRequest = (request: IHrCompetencyIndicatorGetAllRequest) => action(HrCompetencyIndicatorAction.GET_ALL_REQUEST, request);
export const hrCompetencyIndicatorGetAllSuccess = (response: IResponseCollection<IHrCompetencyIndicator>) => action(HrCompetencyIndicatorAction.GET_ALL_SUCCESS, response);
export const hrCompetencyIndicatorGetAllError = (error: any) => action(HrCompetencyIndicatorAction.GET_ALL_ERROR, error);
export const hrCompetencyIndicatorGetAllDispose = () => action(HrCompetencyIndicatorAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyIndicatorGetListRequest = (request: IHrCompetencyIndicatorGetListRequest) => action(HrCompetencyIndicatorAction.GET_LIST_REQUEST, request);
export const hrCompetencyIndicatorGetListSuccess = (response: IResponseCollection<IHrCompetencyIndicatorList>) => action(HrCompetencyIndicatorAction.GET_LIST_SUCCESS, response);
export const hrCompetencyIndicatorGetListError = (error: any) => action(HrCompetencyIndicatorAction.GET_LIST_ERROR, error);
export const hrCompetencyIndicatorGetListDispose = () => action(HrCompetencyIndicatorAction.GET_LIST_DISPOSE);

// get by id
export const hrCompetencyIndicatorGetByIdRequest = (request: IHrCompetencyIndicatorGetDetailRequest) => action(HrCompetencyIndicatorAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyIndicatorGetByIdSuccess = (response: IResponseSingle<IHrCompetencyIndicatorDetail>) => action(HrCompetencyIndicatorAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyIndicatorGetByIdError = (error: any) => action(HrCompetencyIndicatorAction.GET_BY_ID_ERROR, error);
export const hrCompetencyIndicatorGetByIdDispose = () => action(HrCompetencyIndicatorAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyIndicatorPostRequest = (request: IHrCompetencyIndicatorPostRequest) => action(HrCompetencyIndicatorAction.POST_REQUEST, request);
export const hrCompetencyIndicatorPostSuccess = (response: IResponseSingle<IHrCompetencyIndicator>) => action(HrCompetencyIndicatorAction.POST_SUCCESS, response);
export const hrCompetencyIndicatorPostError = (error: any) => action(HrCompetencyIndicatorAction.POST_ERROR, error);
export const hrCompetencyIndicatorPostDispose = () => action(HrCompetencyIndicatorAction.POST_DISPOSE);

// put
export const hrCompetencyIndicatorPutRequest = (request: IHrCompetencyIndicatorPutRequest) => action(HrCompetencyIndicatorAction.PUT_REQUEST, request);
export const hrCompetencyIndicatorPutSuccess = (response: IResponseSingle<IHrCompetencyIndicator>) => action(HrCompetencyIndicatorAction.PUT_SUCCESS, response);
export const hrCompetencyIndicatorPutError = (error: any) => action(HrCompetencyIndicatorAction.PUT_ERROR, error);
export const hrCompetencyIndicatorPutDispose = () => action(HrCompetencyIndicatorAction.PUT_DISPOSE);