import {
  IEmployeeAccessGetAllRequest,
  IEmployeeAccessGetDetailRequest,
  IEmployeeAccessGetListRequest,
  IEmployeeAllRequest,
  IEmployeeByIdRequest,
  IEmployeeLeaveByIdRequest,
  IEmployeeListRequest,
} from '@account/classes/queries';
import { IEmployee, IEmployeeAccess, IEmployeeAccessList, IEmployeeDetail, IEmployeeLeave } from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IEmployeeMy } from '../response/IEmployeeMy';

export interface IAccountState {
  accountEmployeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  accountEmployeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  accountEmployeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
  
  accountEmployeeMyGet: IQuerySingleState<{}, IEmployeeMy>;

  accountEmployeeLeaveGet: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;

  accountEmployeeAccessGetAll: IQueryCollectionState<IEmployeeAccessGetAllRequest, IEmployeeAccess>;
  accountEmployeeAccessGetList: IQueryCollectionState<IEmployeeAccessGetListRequest, IEmployeeAccessList>;
  accountEmployeeAccessGetById: IQuerySingleState<IEmployeeAccessGetDetailRequest, IEmployeeAccess>;
}