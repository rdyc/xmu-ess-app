import { IEmployeeMyState, IEmployeeProfileCommandState, IEmployeeProfileQueryState } from '@account/interfaces';
import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeListRequest } from '@account/interfaces/queries';
import { IEmployee, IEmployeeDetail } from '@account/interfaces/response';
import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/interfaces/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/interfaces/response';
import { IQueryCollectionState } from '@generic/interfaces';
import { IQuerySingleState } from '@generic/interfaces/IQuerySingleState';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest } from '@lookup/interfaces/queries';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/interfaces/response';
import {
  IProjectGetAllRequest,
  IProjectGetByIdRequest,
  IProjectPostRequest,
  IProjectPutRequest,
} from '@project/classes/queries';
import { IProjectGetListRequest } from '@project/classes/queries/IProjectGetListRequest';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState {
  layout: ILayoutState;
  appBar: IAppBarState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;

  /* common */
  systemGetAll: IQueryCollectionState<ISystemAllRequest, ISystem>;
  systemGetList: IQueryCollectionState<ISystemListRequest, ISystemList>;
  systemGetById: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;

  /* lookup */
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;

  /* profile */
  profileQuery: IEmployeeProfileQueryState;
  profileCommand: IEmployeeProfileCommandState;

  /* employee */
  employeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  employeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  employeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;

  /* project */
  projectGetAll: IQueryCollectionState<IProjectGetAllRequest, IProject>;
  projectGetList: IQuerySingleState<IProjectGetListRequest, IProjectList>;
  projectGetById: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
  projectPost: IQuerySingleState<IProjectPostRequest, IProject>;
  projectPut: IQuerySingleState<IProjectPutRequest, IProject>;
}
