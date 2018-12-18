import {
  IEmployeeAllRequest,
  IEmployeeByIdRequest,
  IEmployeeDeleteRequest,
  IEmployeeLeaveByIdRequest,
  IEmployeeListRequest,
  IEmployeePostRequest,
  IEmployeePutRequest,
} from '@account/classes/queries';
import { 
  IEmployee, 
  IEmployeeDetail, 
  IEmployeeLeave 
} from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IEmployeeAccessHistoryAllRequest, 
  IEmployeeAccessHistoryByIdRequest, 
  IEmployeeAccessHistoryListRequest 
} from '../queries/employeeAccessHistory';
import { 
  IEmployeeAccessHistory, 
  IEmployeeAccessHistoryDetail, 
  IEmployeeAccessHistoryList
} from '../response/employeeAccessHistory';
import { IEmployeeMy } from '../response/IEmployeeMy';

export interface IAccountState {
  // account employee
  accountEmployeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  accountEmployeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  accountEmployeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
  accountEmployeePost: IQuerySingleState<IEmployeePostRequest, IEmployee>;
  accountEmployeePut: IQuerySingleState<IEmployeePutRequest, IEmployee>;
  accountEmployeeDelete: IQuerySingleState<IEmployeeDeleteRequest, boolean>;
  
  // account employee access history
  accountEmployeeAccessHistoryGetAll: IQueryCollectionState<IEmployeeAccessHistoryAllRequest, IEmployeeAccessHistory>;
  accountEmployeeAccessHistoryGetList: IQueryCollectionState<IEmployeeAccessHistoryListRequest, IEmployeeAccessHistoryList>;
  accountEmployeeAccessHistoryGetById: IQuerySingleState<IEmployeeAccessHistoryByIdRequest, IEmployeeAccessHistoryDetail>;
  
  accountEmployeeMyGet: IQuerySingleState<{}, IEmployeeMy>;

  accountEmployeeLeaveGet: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
}