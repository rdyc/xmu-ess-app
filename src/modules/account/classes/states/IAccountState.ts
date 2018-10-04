import { IEmployeeProfileCommandState } from '@account/classes/IEmployeeProfileCommandState';
import { IEmployeeProfileQueryState } from '@account/classes/IEmployeeProfileQueryState';
import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeListRequest } from '@account/classes/queries';
import { IEmployee, IEmployeeDetail } from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';

export interface IAccountState {
  profileQuery: IEmployeeProfileQueryState;
  profileCommand: IEmployeeProfileCommandState;

  employeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  employeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  employeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
}