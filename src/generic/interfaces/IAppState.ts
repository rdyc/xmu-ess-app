import { IEmployeeMyState } from '@account/classes';
import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IExpenseState } from '@expense/classes/states';
import { IFinanceState } from '@finance/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { IUserState } from '@layout/interfaces/IUserState';
import { ILeaveState } from '@leave/classes/states';
import { ILookupState } from '@lookup/classes/states';
import { IMileageState } from '@mileage/classes/states';
import { IProjectState } from '@project/classes/states';
import { ITimesheetState } from '@timesheet/classes/states';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState extends 
  ICommonState, 
  ILookupState, 
  IAccountState, 
  IProjectState, 
  ILeaveState,
  ITimesheetState,
  IFinanceState, 
  IExpenseState,
  IMileageState {
  user: IUserState;
  layout: ILayoutState;
  appBar: IAppBarState;
  navBottom: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;
}