import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer, ILookupMileageException } from '@lookup/classes';
import { IOrganizationWorkflow } from '@organization/interfaces';
import { IProject, IProjectSite } from '@project/classes/response';

export interface ITimesheetDetail {
  uid: string;
  employeeUid: string | null;
  employee: IAccountEmployee | null;
  activityType: string;
  activity: ICommonSystem | null;
  customerUid: string;
  customer: ILookupCustomer | null;
  projectUid: string;
  project: IProject | null;
  siteUid: string;
  site: IProjectSite | null;
  mileageExceptionUid: string | null;
  value: number;
  mileageException: ILookupMileageException | null;
  date: string;
  start: string;
  end: string;
  hours: number | null;
  description: string | null;
  rateUid: string | null;
  rateAmount: number | null;
  rateTotalAmount: number | null;
  statusType: string;
  status: ICommonSystem | null;
  notes: string | null;
  isMileage: boolean;
  isNotified: boolean;
  histories: History[] | null;
  workflow: IOrganizationWorkflow | null;
  changes: IBaseChanges | null;
}