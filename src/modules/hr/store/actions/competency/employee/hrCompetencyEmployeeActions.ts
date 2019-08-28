import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailRequest, 
  IHrCompetencyEmployeePatchRequest, 
  IHrCompetencyEmployeePostRequest
} from '@hr/classes/queries';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyEmployeeAction {
  GET_ALL_REQUEST = '@@hr/competency/employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/employee/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/employee/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/employee/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/employee/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/employee/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/employee/POST_DISPOSE',
  PATCH_REQUEST = '@@hr/competency/employee/PATCH_REQUEST',
  PATCH_SUCCESS = '@@hr/competency/employee/PATCH_SUCCESS',
  PATCH_ERROR = '@@hr/competency/employee/PATCH_ERROR',
  PATCH_DISPOSE = '@@hr/competency/employee/PATCH_DISPOSE',
}

// get all
export const hrCompetencyEmployeeGetAllRequest = (request: IHrCompetencyEmployeeGetAllRequest) => action(HrCompetencyEmployeeAction.GET_ALL_REQUEST, request);
export const hrCompetencyEmployeeGetAllSuccess = (response: IResponseCollection<IHrCompetencyEmployee>) => action(HrCompetencyEmployeeAction.GET_ALL_SUCCESS, response);
export const hrCompetencyEmployeeGetAllError = (error: any) => action(HrCompetencyEmployeeAction.GET_ALL_ERROR, error);
export const hrCompetencyEmployeeGetAllDispose = () => action(HrCompetencyEmployeeAction.GET_ALL_DISPOSE);

// get by id
export const hrCompetencyEmployeeGetByIdRequest = (request: IHrCompetencyEmployeeGetDetailRequest) => action(HrCompetencyEmployeeAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyEmployeeGetByIdSuccess = (response: IResponseCollection<IHrCompetencyEmployeeDetail>) => action(HrCompetencyEmployeeAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyEmployeeGetByIdError = (error: any) => action(HrCompetencyEmployeeAction.GET_BY_ID_ERROR, error);
export const hrCompetencyEmployeeGetByIdDispose = () => action(HrCompetencyEmployeeAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyEmployeePostRequest = (request: IHrCompetencyEmployeePostRequest) => action(HrCompetencyEmployeeAction.POST_REQUEST, request);
export const hrCompetencyEmployeePostSuccess = (response: IResponseSingle<IHrCompetencyEmployee>) => action(HrCompetencyEmployeeAction.POST_SUCCESS, response);
export const hrCompetencyEmployeePostError = (error: any) => action(HrCompetencyEmployeeAction.POST_ERROR, error);
export const hrCompetencyEmployeePostDispose = () => action(HrCompetencyEmployeeAction.POST_DISPOSE);

// patch
export const hrCompetencyEmployeePatchRequest = (request: IHrCompetencyEmployeePatchRequest) => action(HrCompetencyEmployeeAction.PATCH_REQUEST, request);
export const hrCompetencyEmployeePatchSuccess = (response: IResponseSingle<IHrCompetencyEmployee>) => action(HrCompetencyEmployeeAction.PATCH_SUCCESS, response);
export const hrCompetencyEmployeePatchError = (error: any) => action(HrCompetencyEmployeeAction.PATCH_ERROR, error);
export const hrCompetencyEmployeePatchDispose = () => action(HrCompetencyEmployeeAction.PATCH_DISPOSE);