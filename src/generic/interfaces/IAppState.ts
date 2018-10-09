import { IEmployeeMyState } from '@account/classes';
import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState, IUserState } from '@layout/interfaces';
import { ILookupState } from '@lookup/classes/states';
import { IProjectState } from '@project/classes/states';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState extends ICommonState, ILookupState, IAccountState, IProjectState {
  user: IUserState;
  layout: ILayoutState;
  appBar: IAppBarState;
  navBottom: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;
}
