import { IEmployeeProfileCommandState } from '@account/classes/IEmployeeProfileCommandState';
import { IEmployeeProfileQueryState } from '@account/classes/IEmployeeProfileQueryState';
import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeLeaveByIdRequest, IEmployeeListRequest } from '@account/classes/queries';
import { IEmployee, IEmployeeDetail, IEmployeeLeave } from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IAccountState {
  profileQuery: IEmployeeProfileQueryState;
  profileCommand: IEmployeeProfileCommandState;

  accountEmployeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  accountEmployeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  accountEmployeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;

  accountEmployeeLeaveGetById: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
}