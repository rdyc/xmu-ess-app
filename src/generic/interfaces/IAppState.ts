<<<<<<< HEAD
import { IEmployeeMyState } from '@account/classes';
import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { ILookupState } from '@lookup/classes/states';
import { IProjectState } from '@project/classes/states';
import { IPurchaseState } from '@purchase/classes/states';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState extends ICommonState, ILookupState, IAccountState, IProjectState, IPurchaseState {
  layout: ILayoutState;
  appBar: IAppBarState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;
}
=======
import { IEmployeeMyState } from '@account/classes';
import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IFinanceState } from '@finance/classes/states';
import { IExpenseState } from '@expense/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { ILeaveRequestState } from '@leave/classes/states';
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
  ITimesheetState,
  IExpenseState, 
  IFinanceState, 
  IMileageState,
  ILeaveRequestState
{
  layout: ILayoutState;
  appBar: IAppBarState;
  listBar: IListBarState;
  oidc: UserState;
  account: IEmployeeMyState;
  notification: INotificationState;
  form: FormStateMap;
}
>>>>>>> 7a2476ff84595305aaddea911c1c8187d6b860c0
