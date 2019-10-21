import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IHrCompetencyClusterGetAllRequest, 
  IHrCompetencyClusterGetDetailRequest, 
  IHrCompetencyClusterGetListRequest,
  IHrCompetencyClusterPatchRequest, 
  IHrCompetencyClusterPostRequest,
} from 'modules/hr/classes/queries';
import { IHrCompetencyCluster, IHrCompetencyClusterDetail, IHrCompetencyClusterList } from 'modules/hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyClusterAction {
  GET_ALL_REQUEST = '@@hr/competency/cluster/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/cluster/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/cluster/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/cluster/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@hr/competency/cluster/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@hr/competency/cluster/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@hr/competency/cluster/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@hr/competency/cluster/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/cluster/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/cluster/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/cluster/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/cluster/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/cluster/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/cluster/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/cluster/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/cluster/POST_DISPOSE',
  PATCH_REQUEST = '@@hr/competency/cluster/PATCH_REQUEST',
  PATCH_SUCCESS = '@@hr/competency/cluster/PATCH_SUCCESS',
  PATCH_ERROR = '@@hr/competency/cluster/PATCH_ERROR',
  PATCH_DISPOSE = '@@hr/competency/cluster/PATCH_DISPOSE',
}

// get all
export const hrCompetencyClusterGetAllRequest = (request: IHrCompetencyClusterGetAllRequest) => action(HrCompetencyClusterAction.GET_ALL_REQUEST, request);
export const hrCompetencyClusterGetAllSuccess = (response: IResponseCollection<IHrCompetencyCluster>) => action(HrCompetencyClusterAction.GET_ALL_SUCCESS, response);
export const hrCompetencyClusterGetAllError = (error: any) => action(HrCompetencyClusterAction.GET_ALL_ERROR, error);
export const hrCompetencyClusterGetAllDispose = () => action(HrCompetencyClusterAction.GET_ALL_DISPOSE);

// get list
export const hrCompetencyClusterGetListRequest = (request: IHrCompetencyClusterGetListRequest) => action(HrCompetencyClusterAction.GET_LIST_REQUEST, request);
export const hrCompetencyClusterGetListSuccess = (response: IResponseCollection<IHrCompetencyClusterList>) => action(HrCompetencyClusterAction.GET_LIST_SUCCESS, response);
export const hrCompetencyClusterGetListError = (error: any) => action(HrCompetencyClusterAction.GET_LIST_ERROR, error);
export const hrCompetencyClusterGetListDispose = () => action(HrCompetencyClusterAction.GET_LIST_DISPOSE);

// get by id
export const hrCompetencyClusterGetByIdRequest = (request: IHrCompetencyClusterGetDetailRequest) => action(HrCompetencyClusterAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyClusterGetByIdSuccess = (response: IResponseSingle<IHrCompetencyClusterDetail>) => action(HrCompetencyClusterAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyClusterGetByIdError = (error: any) => action(HrCompetencyClusterAction.GET_BY_ID_ERROR, error);
export const hrCompetencyClusterGetByIdDispose = () => action(HrCompetencyClusterAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyClusterPostRequest = (request: IHrCompetencyClusterPostRequest) => action(HrCompetencyClusterAction.POST_REQUEST, request);
export const hrCompetencyClusterPostSuccess = (response: IResponseSingle<IHrCompetencyCluster>) => action(HrCompetencyClusterAction.POST_SUCCESS, response);
export const hrCompetencyClusterPostError = (error: any) => action(HrCompetencyClusterAction.POST_ERROR, error);
export const hrCompetencyClusterPostDispose = () => action(HrCompetencyClusterAction.POST_DISPOSE);

// patch
export const hrCompetencyClusterPatchRequest = (request: IHrCompetencyClusterPatchRequest) => action(HrCompetencyClusterAction.PATCH_REQUEST, request);
export const hrCompetencyClusterPatchSuccess = (response: IResponseSingle<IHrCompetencyCluster>) => action(HrCompetencyClusterAction.PATCH_SUCCESS, response);
export const hrCompetencyClusterPatchError = (error: any) => action(HrCompetencyClusterAction.PATCH_ERROR, error);
export const hrCompetencyClusterPatchDispose = () => action(HrCompetencyClusterAction.PATCH_DISPOSE);