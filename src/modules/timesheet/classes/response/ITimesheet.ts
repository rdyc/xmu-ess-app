import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer, ILookupMileageException } from '@lookup/classes';
import { IProject, IProjectSite } from '@project/classes/response';

export interface ITimesheet {
  uid: string;
  employeeUid: string;
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
  description: string;
  rateUid: string | null;
  rateAmount: number | null;
  rateTotalAmount: number | null;
  statusType: string;
  status: ICommonSystem | null;
  notes: string | null;
  isMileage: boolean;
  changes: IBaseChanges | null;
}