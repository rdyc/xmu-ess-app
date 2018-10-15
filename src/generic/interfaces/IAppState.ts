import { IEmployeeMyState } from '@account/classes';
import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { ILookupState } from '@lookup/classes/states';
import { IProjectState } from '@project/classes/states';
import { ITimesheetState } from '@timesheet/classes/states';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState extends ICommonState, ILookupState, IAccountState, IProjectState, ITimesheetState {
  layout: ILayoutState;
  appBar: IAppBarState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;
}
