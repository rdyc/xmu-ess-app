import { IAccountState } from '@account/classes/states';
import { ICommonState } from '@common/classes/states';
import { IExpenseState } from '@expense/classes/states';
import { IFinanceState } from '@finance/classes/states';
import { IHomeState } from '@home/classes/states';
import { IHrCompetencyState } from '@hr/classes/states';
import { IKPIState } from '@kpi/classes/states';
import { IPageState } from '@layout/classes/states';
import { IAppBarState, ILayoutState, IListBarState, INotificationState } from '@layout/interfaces';
import { IUserState } from '@layout/interfaces/IUserState';
import { ILeaveState } from '@leave/classes/states';
import { ILookupState } from '@lookup/classes/states';
import { IMileageState } from '@mileage/classes/states';
import { IOrganizationState } from '@organization/classes/states';
import { IMyProfileState } from '@profile/classes/states/IMyProfileState';
import { IProjectState } from '@project/classes/states';
import { IPurchaseState } from '@purchase/classes/states';
import { ISummaryState } from '@summary/classes/states';
import { ITimesheetState } from '@timesheet/classes/states';
import { ITravelState } from '@travel/classes/states';
import { IWebJobState } from '@webjob/classes/states';
import { IInforState } from 'modules/infor/classes/states';
import { IMarkdownState } from 'playground/markdown/classes/states';
import { FormStateMap } from 'redux-form';
import { UserState } from 'redux-oidc';

export interface IAppState extends
  ICommonState, 
  ILookupState, 
  IOrganizationState,
  IAccountState, 
  IProjectState, 
  ITimesheetState,
  IFinanceState, 
  IMileageState,
  ITravelState,
  IExpenseState,
  ILeaveState,
  IPurchaseState,
  IOrganizationState,
  IHomeState,
  ISummaryState,
  IInforState,
  IMarkdownState,
  IHrCompetencyState,
  IKPIState,
  IMyProfileState,
  IWebJobState,
  IInforState {
  oidc: UserState;
  user: IUserState;
  layout: ILayoutState;
  view: IPageState;
  appBar: IAppBarState;
  navBottom: IListBarState;
  notification: INotificationState;
  form: FormStateMap;
}
