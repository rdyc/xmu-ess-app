import { UserState } from 'redux-oidc';
import { INotificationState } from '../../modules/@layout/interfaces/INotificationState';
import { FormStateMap } from 'redux-form';
import { IEmployeeMyState } from '../../modules/account/interfaces/IEmployeeMyState';
import { IEmployeeProfileCommandState } from '../../modules/account/interfaces/IEmployeeProfileCommandState';
import { IEmployeeProfileQueryState } from '../../modules/account/interfaces/IEmployeeProfileQueryState';
import { ILayoutState, IListBarState } from '../../modules/@layout/interfaces';
import { IQueryState, IProjectRegistrationAllRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';

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
  projectQuery: IQueryState<IProjectRegistrationAllRequest, IProject>;
}
