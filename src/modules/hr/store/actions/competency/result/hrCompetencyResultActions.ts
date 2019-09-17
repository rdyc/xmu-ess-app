import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailListRequest, 
  IHrCompetencyEmployeeGetDetailRequest, 
  IHrCompetencyEmployeeGetListRequest,
  IHrCompetencyEmployeePatchRequest,
  IHrCompetencyEmployeePostRequest
} from '@hr/classes/queries';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail, IHrCompetencyEmployeeDetailList, IHrCompetencyEmployeeList } from '@hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyResultAction {
  GET_ALL_REQUEST = '@@hr/competency/result/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/result/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/result/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/result/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/result/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/result/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/result/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/result/GET_LIST_DISPOSE',
  GET_DETAIL_LIST_REQUEST = '@@hr/competency/result/GET_DETAIL_LIST_REQUEST',
  GET_DETAIL_LIST_SUCCESS = '@@hr/competency/result/GET_DETAIL_LIST_SUCCESS',
  GET_DETAIL_LIST_ERROR = '@@hr/competency/result/GET_DETAIL_LIST_ERROR',
  GET_DETAIL_LIST_DISPOSE = '@@hr/competency/result/GET_DETAIL_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/result/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/result/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/result/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/result/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/result/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/result/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/result/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/result/POST_DISPOSE',
  PATCH_REQUEST = '@@hr/competency/result/PATCH_REQUEST',
  PATCH_SUCCESS = '@@hr/competency/result/PATCH_SUCCESS',
  PATCH_ERROR = '@@hr/competency/result/PATCH_ERROR',
  PATCH_DISPOSE = '@@hr/competency/result/PATCH_DISPOSE',
}

// get all
export const hrCompetencyResultGetAllRequest = (request: IHrCompetencyEmployeeGetAllRequest) => action(HrCompetencyResultAction.GET_ALL_REQUEST, request);
export const hrCompetencyResultGetAllSuccess = (response: IResponseCollection<IHrCompetencyEmployee>) => action(HrCompetencyResultAction.GET_ALL_SUCCESS, response);
export const hrCompetencyResultGetAllError = (error: any) => action(HrCompetencyResultAction.GET_ALL_ERROR, error);
export const hrCompetencyResultGetAllDispose = () => action(HrCompetencyResultAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyResultGetListRequest = (request: IHrCompetencyEmployeeGetListRequest) => action(HrCompetencyResultAction.GET_LIST_REQUEST, request);
export const hrCompetencyResultGetListSuccess = (response: IResponseCollection<IHrCompetencyEmployeeList>) => action(HrCompetencyResultAction.GET_LIST_SUCCESS, response);
export const hrCompetencyResultGetListError = (error: any) => action(HrCompetencyResultAction.GET_LIST_ERROR, error);
export const hrCompetencyResultGetListDispose = () => action(HrCompetencyResultAction.GET_LIST_DISPOSE);

// get detail list
export const hrCompetencyResultGetDetailListRequest = (request: IHrCompetencyEmployeeGetDetailListRequest) => action(HrCompetencyResultAction.GET_DETAIL_LIST_REQUEST, request);
export const hrCompetencyResultGetDetailListSuccess = (response: IResponseCollection<IHrCompetencyEmployeeDetailList>) => action(HrCompetencyResultAction.GET_DETAIL_LIST_SUCCESS, response);
export const hrCompetencyResultGetDetailListError = (error: any) => action(HrCompetencyResultAction.GET_DETAIL_LIST_ERROR, error);
export const hrCompetencyResultGetDetailListDispose = () => action(HrCompetencyResultAction.GET_DETAIL_LIST_DISPOSE);

// get by id
export const hrCompetencyResultGetByIdRequest = (request: IHrCompetencyEmployeeGetDetailRequest) => action(HrCompetencyResultAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyResultGetByIdSuccess = (response: IResponseCollection<IHrCompetencyEmployeeDetail>) => action(HrCompetencyResultAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyResultGetByIdError = (error: any) => action(HrCompetencyResultAction.GET_BY_ID_ERROR, error);
export const hrCompetencyResultGetByIdDispose = () => action(HrCompetencyResultAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyResultPostRequest = (request: IHrCompetencyEmployeePostRequest) => action(HrCompetencyResultAction.POST_REQUEST, request);
export const hrCompetencyResultPostSuccess = (response: IResponseSingle<IHrCompetencyEmployee>) => action(HrCompetencyResultAction.POST_SUCCESS, response);
export const hrCompetencyResultPostError = (error: any) => action(HrCompetencyResultAction.POST_ERROR, error);
export const hrCompetencyResultPostDispose = () => action(HrCompetencyResultAction.POST_DISPOSE);

// patch
export const hrCompetencyResultPatchRequest = (request: IHrCompetencyEmployeePatchRequest) => action(HrCompetencyResultAction.PATCH_REQUEST, request);
export const hrCompetencyResultPatchSuccess = (response: IResponseSingle<IHrCompetencyEmployee>) => action(HrCompetencyResultAction.PATCH_SUCCESS, response);
export const hrCompetencyResultPatchError = (error: any) => action(HrCompetencyResultAction.PATCH_ERROR, error);
export const hrCompetencyResultPatchDispose = () => action(HrCompetencyResultAction.PATCH_DISPOSE);