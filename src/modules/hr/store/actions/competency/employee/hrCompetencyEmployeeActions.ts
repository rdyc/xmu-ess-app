import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailListRequest, 
  IHrCompetencyEmployeeGetDetailRequest,
  IHrCompetencyEmployeeGetResultRequest,
  IHrCompetencyEmployeePatchRequest,
} from '@hr/classes/queries';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail, IHrCompetencyEmployeeDetailList } from '@hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyEmployeeAction {
  GET_ALL_REQUEST = '@@hr/competency/employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/employee/GET_ALL_DISPOSE',
  GET_DETAIL_LIST_REQUEST = '@@hr/competency/employee/GET_DETAIL_LIST_REQUEST',
  GET_DETAIL_LIST_SUCCESS = '@@hr/competency/employee/GET_DETAIL_LIST_SUCCESS',
  GET_DETAIL_LIST_ERROR = '@@hr/competency/employee/GET_DETAIL_LIST_ERROR',
  GET_DETAIL_LIST_DISPOSE = '@@hr/competency/employee/GET_DETAIL_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/employee/GET_BY_ID_DISPOSE',
  PATCH_REQUEST = '@@hr/competency/employee/PATCH_REQUEST',
  PATCH_SUCCESS = '@@hr/competency/employee/PATCH_SUCCESS',
  PATCH_ERROR = '@@hr/competency/employee/PATCH_ERROR',
  PATCH_DISPOSE = '@@hr/competency/employee/PATCH_DISPOSE',
  RESULT_REQUEST = '@@hr/competency/employee/RESULT_REQUEST',
  RESULT_SUCCESS = '@@hr/competency/employee/RESULT_SUCCESS',
  RESULT_ERROR = '@@hr/competency/employee/RESULT_ERROR',
  RESULT_DISPOSE = '@@hr/competency/employee/RESULT_DISPOSE',
}

// get all
export const hrCompetencyEmployeeGetAllRequest = (request: IHrCompetencyEmployeeGetAllRequest) => action(HrCompetencyEmployeeAction.GET_ALL_REQUEST, request);
export const hrCompetencyEmployeeGetAllSuccess = (response: IResponseCollection<IHrCompetencyEmployee>) => action(HrCompetencyEmployeeAction.GET_ALL_SUCCESS, response);
export const hrCompetencyEmployeeGetAllError = (error: any) => action(HrCompetencyEmployeeAction.GET_ALL_ERROR, error);
export const hrCompetencyEmployeeGetAllDispose = () => action(HrCompetencyEmployeeAction.GET_ALL_DISPOSE);

// get detail list
export const hrCompetencyEmployeeGetDetailListRequest = (request: IHrCompetencyEmployeeGetDetailListRequest) => action(HrCompetencyEmployeeAction.GET_DETAIL_LIST_REQUEST, request);
export const hrCompetencyEmployeeGetDetailListSuccess = (response: IResponseCollection<IHrCompetencyEmployeeDetailList>) => action(HrCompetencyEmployeeAction.GET_DETAIL_LIST_SUCCESS, response);
export const hrCompetencyEmployeeGetDetailListError = (error: any) => action(HrCompetencyEmployeeAction.GET_DETAIL_LIST_ERROR, error);
export const hrCompetencyEmployeeGetDetailListDispose = () => action(HrCompetencyEmployeeAction.GET_DETAIL_LIST_DISPOSE);

// get by id
export const hrCompetencyEmployeeGetByIdRequest = (request: IHrCompetencyEmployeeGetDetailRequest) => action(HrCompetencyEmployeeAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyEmployeeGetByIdSuccess = (response: IResponseSingle<IHrCompetencyEmployeeDetail>) => action(HrCompetencyEmployeeAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyEmployeeGetByIdError = (error: any) => action(HrCompetencyEmployeeAction.GET_BY_ID_ERROR, error);
export const hrCompetencyEmployeeGetByIdDispose = () => action(HrCompetencyEmployeeAction.GET_BY_ID_DISPOSE);

// patch
export const hrCompetencyEmployeePatchRequest = (request: IHrCompetencyEmployeePatchRequest) => action(HrCompetencyEmployeeAction.PATCH_REQUEST, request);
export const hrCompetencyEmployeePatchSuccess = (response: IResponseSingle<IHrCompetencyEmployee>) => action(HrCompetencyEmployeeAction.PATCH_SUCCESS, response);
export const hrCompetencyEmployeePatchError = (error: any) => action(HrCompetencyEmployeeAction.PATCH_ERROR, error);
export const hrCompetencyEmployeePatchDispose = () => action(HrCompetencyEmployeeAction.PATCH_DISPOSE);

// get result
export const hrCompetencyEmployeeGetResultRequest = (request: IHrCompetencyEmployeeGetResultRequest) => action(HrCompetencyEmployeeAction.RESULT_REQUEST, request);
export const hrCompetencyEmployeeGetResultSuccess = (response: IResponseSingle<IHrCompetencyEmployeeDetail>) => action(HrCompetencyEmployeeAction.RESULT_SUCCESS, response);
export const hrCompetencyEmployeeGetResultError = (error: any) => action(HrCompetencyEmployeeAction.RESULT_ERROR, error);
export const hrCompetencyEmployeeGetResultDispose = () => action(HrCompetencyEmployeeAction.RESULT_DISPOSE);
