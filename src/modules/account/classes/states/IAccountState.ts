import {
  IEmployeeAllRequest,
  IEmployeeByIdRequest,
  IEmployeeDeleteRequest,
  IEmployeeLeaveByIdRequest,
  IEmployeeListRequest,
  IEmployeePostRequest,
  IEmployeePutRequest,
} from '@account/classes/queries';
import { IEmployee, IEmployeeDetail, IEmployeeLeave } from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IEmployeeMy } from '../response/IEmployeeMy';

export interface IAccountState {
  accountEmployeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  accountEmployeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  accountEmployeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
  accountEmployeePost: IQuerySingleState<IEmployeePostRequest, IEmployee>;
  accountEmployeePut: IQuerySingleState<IEmployeePutRequest, IEmployee>;
  accountEmployeeDelete: IQuerySingleState<IEmployeeDeleteRequest, IEmployee>;
  
  accountEmployeeMyGet: IQuerySingleState<{}, IEmployeeMy>;

  accountEmployeeLeaveGet: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
}