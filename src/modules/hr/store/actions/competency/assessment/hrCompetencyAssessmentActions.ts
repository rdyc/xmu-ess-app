import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IAccountEmployeeCompetencyGetAllRequest, 
  IHrCompetencyAssessmentGetAllRequest, 
  IHrCompetencyAssessmentGetDetailRequest, 
  IHrCompetencyAssessmentPostRequest, 
  IHrCompetencyAssessmentPutRequest
} from '@hr/classes/queries';
import { IAccountEmployeeCompetency, IHrCompetencyAssessment, IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { action } from 'typesafe-actions';

export const enum HrCompetencyAssessmentAction {
  GET_ALL_REQUEST = '@@hr/competency/assessment/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@hr/competency/assessment/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@hr/competency/assessment/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@hr/competency/assessment/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@hr/competency/assessment/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@hr/competency/assessment/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@hr/competency/assessment/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@hr/competency/assessment/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@hr/competency/assessment/POST_REQUEST',
  POST_SUCCESS = '@@hr/competency/assessment/POST_SUCCESS',
  POST_ERROR = '@@hr/competency/assessment/POST_ERROR',
  POST_DISPOSE = '@@hr/competency/assessment/POST_DISPOSE',
  PUT_REQUEST = '@@hr/competency/assessment/PUT_REQUEST',
  PUT_SUCCESS = '@@hr/competency/assessment/PUT_SUCCESS',
  PUT_ERROR = '@@hr/competency/assessment/PUT_ERROR',
  PUT_DISPOSE = '@@hr/competency/assessment/PUT_DISPOSE',
  GET_ALL_EMPLOYEE_REQUEST = '@@hr/competency/assessment/GET_ALL_EMPLOYEE_REQUEST',
  GET_ALL_EMPLOYEE_SUCCESS = '@@hr/competency/assessment/GET_ALL_EMPLOYEE_SUCCESS',
  GET_ALL_EMPLOYEE_ERROR = '@@hr/competency/assessment/GET_ALL_EMPLOYEE_ERROR',
  GET_ALL_EMPLOYEE_DISPOSE = '@@hr/competency/assessment/GET_ALL_EMPLOYEE_DISPOSE',
}

// get all
export const hrCompetencyAssessmentGetAllRequest = (request: IHrCompetencyAssessmentGetAllRequest) => action(HrCompetencyAssessmentAction.GET_ALL_REQUEST, request);
export const hrCompetencyAssessmentGetAllSuccess = (response: IResponseCollection<IHrCompetencyAssessment>) => action(HrCompetencyAssessmentAction.GET_ALL_SUCCESS, response);
export const hrCompetencyAssessmentGetAllError = (error: any) => action(HrCompetencyAssessmentAction.GET_ALL_ERROR, error);
export const hrCompetencyAssessmentGetAllDispose = () => action(HrCompetencyAssessmentAction.GET_ALL_DISPOSE);

// get by id
export const hrCompetencyAssessmentGetByIdRequest = (request: IHrCompetencyAssessmentGetDetailRequest) => action(HrCompetencyAssessmentAction.GET_BY_ID_REQUEST, request);
export const hrCompetencyAssessmentGetByIdSuccess = (response: IResponseSingle<IHrCompetencyAssessmentDetail>) => action(HrCompetencyAssessmentAction.GET_BY_ID_SUCCESS, response);
export const hrCompetencyAssessmentGetByIdError = (error: any) => action(HrCompetencyAssessmentAction.GET_BY_ID_ERROR, error);
export const hrCompetencyAssessmentGetByIdDispose = () => action(HrCompetencyAssessmentAction.GET_BY_ID_DISPOSE);

// post
export const hrCompetencyAssessmentPostRequest = (request: IHrCompetencyAssessmentPostRequest) => action(HrCompetencyAssessmentAction.POST_REQUEST, request);
export const hrCompetencyAssessmentPostSuccess = (response: IResponseSingle<IHrCompetencyAssessment>) => action(HrCompetencyAssessmentAction.POST_SUCCESS, response);
export const hrCompetencyAssessmentPostError = (error: any) => action(HrCompetencyAssessmentAction.POST_ERROR, error);
export const hrCompetencyAssessmentPostDispose = () => action(HrCompetencyAssessmentAction.POST_DISPOSE);

// put
export const hrCompetencyAssessmentPutRequest = (request: IHrCompetencyAssessmentPutRequest) => action(HrCompetencyAssessmentAction.PUT_REQUEST, request);
export const hrCompetencyAssessmentPutSuccess = (response: IResponseSingle<IHrCompetencyAssessment>) => action(HrCompetencyAssessmentAction.PUT_SUCCESS, response);
export const hrCompetencyAssessmentPutError = (error: any) => action(HrCompetencyAssessmentAction.PUT_ERROR, error);
export const hrCompetencyAssessmentPutDispose = () => action(HrCompetencyAssessmentAction.PUT_DISPOSE);

// get all
export const accountEmployeeCompetencyGetAllRequest = (request: IAccountEmployeeCompetencyGetAllRequest) => action(HrCompetencyAssessmentAction.GET_ALL_EMPLOYEE_REQUEST, request);
export const accountEmployeeCompetencyGetAllSuccess = (response: IResponseCollection<IAccountEmployeeCompetency>) => action(HrCompetencyAssessmentAction.GET_ALL_EMPLOYEE_SUCCESS, response);
export const accountEmployeeCompetencyGetAllError = (error: any) => action(HrCompetencyAssessmentAction.GET_ALL_EMPLOYEE_ERROR, error);
export const accountEmployeeCompetencyGetAllDispose = () => action(HrCompetencyAssessmentAction.GET_ALL_EMPLOYEE_DISPOSE);
