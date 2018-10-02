import { IResponseCollection } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest } from '@lookup/interfaces/queries';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/interfaces/response';
import { action } from 'typesafe-actions';

export const enum CustomerAction {
  GET_ALL_REQUEST = '@@Customer/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@Customer/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@Customer/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@Customer/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@Customer/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@Customer/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@Customer/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@Customer/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@Customer/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@Customer/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@Customer/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@Customer/GET_BY_ID_DISPOSE',
}

// get all
export const customerGetAllRequest = (request: ICustomerAllRequest) => action(CustomerAction.GET_ALL_REQUEST, request);
export const customerGetAllSuccess = (response: IResponseCollection<ICustomer>) => action(CustomerAction.GET_ALL_SUCCESS, response);
export const customerGetAllError = (message: string) => action(CustomerAction.GET_ALL_ERROR, message);
export const customerGetAllDispose = () => action(CustomerAction.GET_ALL_DISPOSE);

// get list
export const customerGetListRequest = (request: ICustomerListRequest) => action(CustomerAction.GET_LIST_REQUEST, request);
export const customerGetListSuccess = (response: IResponseCollection<ICustomerList>) => action(CustomerAction.GET_LIST_SUCCESS, response);
export const customerGetListError = (message: string) => action(CustomerAction.GET_LIST_ERROR, message);
export const customerGetListDispose = () => action(CustomerAction.GET_LIST_DISPOSE);

// get by id
export const customerGetByIdRequest = (request: ICustomerByIdRequest) => action(CustomerAction.GET_BY_ID_REQUEST, request);
export const customerGetByIdSuccess = (response: IResponseCollection<ICustomerDetail>) => action(CustomerAction.GET_BY_ID_SUCCESS, response);
export const customerGetByIdError = (message: string) => action(CustomerAction.GET_BY_ID_ERROR, message);
export const customerGetByIdDispose = () => action(CustomerAction.GET_BY_ID_DISPOSE);