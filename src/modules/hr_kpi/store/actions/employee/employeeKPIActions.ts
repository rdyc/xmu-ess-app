import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IEmployeeKPIGetAllRequest, 
  IEmployeeKPIGetByIdRequest, 
  IEmployeeKPIGetItemListRequest, 
  IEmployeeKPIPostBulkRequest, 
  IEmployeeKPIPostRequest, 
  IEmployeeKPIPutFinalRequest, 
  IEmployeeKPIPutItemBulkRequest, 
  IEmployeeKPIPutRequest 
} from '@kpi/classes/queries/employee';
import { IEmployeeKPI, IEmployeeKPIDetail, IEmployeeKPIItem } from '@kpi/classes/response/employee';
import { action } from 'typesafe-actions';

export const enum EmployeeKPIAction {
  GET_ALL_REQUEST = '@@kpi/employee/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/employee/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/employee/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/employee/GET_ALL_DISPOSE',
  GET_ITEM_LIST_REQUEST = '@@kpi/employee/GET_ITEM_LIST_REQUEST',
  GET_ITEM_LIST_SUCCESS = '@@kpi/employee/GET_ITEM_LIST_SUCCESS',
  GET_ITEM_LIST_ERROR = '@@kpi/employee/GET_ITEM_LIST_ERROR',
  GET_ITEM_LIST_DISPOSE = '@@kpi/employee/GET_ITEM_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/employee/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/employee/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/employee/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/employee/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@kpi/employee/POST_REQUEST',
  POST_SUCCESS = '@@kpi/employee/POST_SUCCESS',
  POST_ERROR = '@@kpi/employee/POST_ERROR',
  POST_DISPOSE = '@@kpi/employee/POST_DISPOSE',
  POST_BULK_REQUEST = '@@kpi/employee/POST_BULK_REQUEST',
  POST_BULK_SUCCESS = '@@kpi/employee/POST_BULK_SUCCESS',
  POST_BULK_ERROR = '@@kpi/employee/POST_BULK_ERROR',
  POST_BULK_DISPOSE = '@@kpi/employee/POST_BULK_DISPOSE',
  PUT_REQUEST = '@@kpi/employee/PUT_REQUEST',
  PUT_SUCCESS = '@@kpi/employee/PUT_SUCCESS',
  PUT_ERROR = '@@kpi/employee/PUT_ERROR',
  PUT_DISPOSE = '@@kpi/employee/PUT_DISPOSE',
  PUT_ITEM_BULK_REQUEST = '@@kpi/employee/PUT_ITEM_BULK_REQUEST',
  PUT_ITEM_BULK_SUCCESS = '@@kpi/employee/PUT_ITEM_BULK_SUCCESS',
  PUT_ITEM_BULK_ERROR = '@@kpi/employee/PUT_ITEM_BULK_ERROR',
  PUT_ITEM_BULK_DISPOSE = '@@kpi/employee/PUT_ITEM_BULK_DISPOSE',
  PUT_FINAL_REQUEST = '@@kpi/employee/PUT_FINAL_REQUEST',
  PUT_FINAL_SUCCESS = '@@kpi/employee/PUT_FINAL_SUCCESS',
  PUT_FINAL_ERROR = '@@kpi/employee/PUT_FINAL_ERROR',
  PUT_FINAL_DISPOSE = '@@kpi/employee/PUT_FINAL_DISPOSE',
}

// get all
export const EmployeeKPIGetAllRequest = (request: IEmployeeKPIGetAllRequest) => action(EmployeeKPIAction.GET_ALL_REQUEST, request);
export const EmployeeKPIGetAllSuccess = (response: IResponseCollection<IEmployeeKPI>) => action(EmployeeKPIAction.GET_ALL_SUCCESS, response);
export const EmployeeKPIGetAllError = (error: any) => action(EmployeeKPIAction.GET_ALL_ERROR, error);
export const EmployeeKPIGetAllDispose = () => action(EmployeeKPIAction.GET_ALL_DISPOSE);

// get item list
export const EmployeeKPIGetItemListRequest = (request: IEmployeeKPIGetItemListRequest) => action(EmployeeKPIAction.GET_ITEM_LIST_REQUEST, request);
export const EmployeeKPIGetItemListSuccess = (response: IResponseCollection<IEmployeeKPIItem>) => action(EmployeeKPIAction.GET_ITEM_LIST_SUCCESS, response);
export const EmployeeKPIGetItemListError = (error: any) => action(EmployeeKPIAction.GET_ITEM_LIST_ERROR, error);
export const EmployeeKPIGetItemListDispose = () => action(EmployeeKPIAction.GET_ITEM_LIST_DISPOSE);

// get by id
export const EmployeeKPIGetByIdRequest = (request: IEmployeeKPIGetByIdRequest) => action(EmployeeKPIAction.GET_BY_ID_REQUEST, request);
export const EmployeeKPIGetByIdSuccess = (response: IResponseSingle<IEmployeeKPIDetail>) => action(EmployeeKPIAction.GET_BY_ID_SUCCESS, response);
export const EmployeeKPIGetByIdError = (error: any) => action(EmployeeKPIAction.GET_BY_ID_ERROR, error);
export const EmployeeKPIGetByIdDispose = () => action(EmployeeKPIAction.GET_BY_ID_DISPOSE);

// post
export const EmployeeKPIPostRequest = (request: IEmployeeKPIPostRequest) => action(EmployeeKPIAction.POST_REQUEST, request);
export const EmployeeKPIPostSuccess = (response: IResponseSingle<IEmployeeKPI>) => action(EmployeeKPIAction.POST_SUCCESS, response);
export const EmployeeKPIPostError = (error: any) => action(EmployeeKPIAction.POST_ERROR, error);
export const EmployeeKPIPostDispose = () => action(EmployeeKPIAction.POST_DISPOSE);

// post bulk
export const EmployeeKPIPostBulkRequest = (request: IEmployeeKPIPostBulkRequest) => action(EmployeeKPIAction.POST_BULK_REQUEST, request);
export const EmployeeKPIPostBulkSuccess = (response: IResponseCollection<IEmployeeKPI>) => action(EmployeeKPIAction.POST_BULK_SUCCESS, response);
export const EmployeeKPIPostBulkError = (error: any) => action(EmployeeKPIAction.POST_BULK_ERROR, error);
export const EmployeeKPIPostBulkDispose = () => action(EmployeeKPIAction.POST_BULK_DISPOSE);

// put
export const EmployeeKPIPutRequest = (request: IEmployeeKPIPutRequest) => action(EmployeeKPIAction.PUT_REQUEST, request);
export const EmployeeKPIPutSuccess = (response: IResponseSingle<IEmployeeKPI>) => action(EmployeeKPIAction.PUT_SUCCESS, response);
export const EmployeeKPIPutError = (error: any) => action(EmployeeKPIAction.PUT_ERROR, error);
export const EmployeeKPIPutDispose = () => action(EmployeeKPIAction.PUT_DISPOSE);

// put item bulk
export const EmployeeKPIPutItemBulkRequest = (request: IEmployeeKPIPutItemBulkRequest) => action(EmployeeKPIAction.PUT_ITEM_BULK_REQUEST, request);
export const EmployeeKPIPutItemBulkSuccess = (response: IResponseCollection<IEmployeeKPIItem>) => action(EmployeeKPIAction.PUT_ITEM_BULK_SUCCESS, response);
export const EmployeeKPIPutItemBulkError = (error: any) => action(EmployeeKPIAction.PUT_ITEM_BULK_ERROR, error);
export const EmployeeKPIPutItemBulkDispose = () => action(EmployeeKPIAction.PUT_ITEM_BULK_DISPOSE);

// put final
export const EmployeeKPIPutFinalRequest = (request: IEmployeeKPIPutFinalRequest) => action(EmployeeKPIAction.PUT_FINAL_REQUEST, request);
export const EmployeeKPIPutFinalSuccess = (response: IResponseSingle<IEmployeeKPI>) => action(EmployeeKPIAction.PUT_FINAL_SUCCESS, response);
export const EmployeeKPIPutFinalError = (error: any) => action(EmployeeKPIAction.PUT_FINAL_ERROR, error);
export const EmployeeKPIPutFinalDispose = () => action(EmployeeKPIAction.PUT_FINAL_DISPOSE);