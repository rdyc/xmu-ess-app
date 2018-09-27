import { IEmployeeMyState, IEmployeeProfileCommandState, IEmployeeProfileQueryState } from '@account/interfaces';
import { IQueryCollectionState } from '@generic/interfaces';
import { ILayoutState, IListBarState, INotificationState, IAppBarState } from '@layout/interfaces';
import { IProjectGetAllRequest, IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProject, IProjectDetail } from '@project/interfaces/response';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';
import { IQuerySingleState } from '@generic/interfaces/IQuerySingleState';
import { IEmployee, IEmployeeDetail } from '@account/interfaces/response';
import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeListRequest } from '@account/interfaces/queries';

export interface IAppState {
  layout: ILayoutState;
  appBar: IAppBarState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;

  /* profile */
  profileQuery: IEmployeeProfileQueryState;
  profileCommand: IEmployeeProfileCommandState;

  /* employee */
  employeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  employeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  employeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;

  /* project */
  projectGetAll: IQueryCollectionState<IProjectGetAllRequest, IProject>;
  projectGetById: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}
