import { IEmployeeMyState, IEmployeeProfileCommandState, IEmployeeProfileQueryState } from '@account/interfaces';
import { IQueryCollectionState } from '@generic/interfaces';
import { ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { IProjectGetAllRequest, IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProject, IProjectDetail } from '@project/interfaces/response';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';
import { IQuerySingleState } from '@generic/interfaces/IQuerySingleState';

export interface IAppState {
  layout: ILayoutState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;

  /* profile */
  profileQuery: IEmployeeProfileQueryState;
  profileCommand: IEmployeeProfileCommandState;

  /* project */
  projectGetAll: IQueryCollectionState<IProjectGetAllRequest, IProject>;
  projectGetById: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}
