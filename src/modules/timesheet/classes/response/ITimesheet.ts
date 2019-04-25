import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer, ILookupMileageException } from '@lookup/classes';
import { IProject, IProjectSite } from '@project/classes/response';

export interface ITimesheet {
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  activityType: string;
  activity?: ICommonSystem;
  customerUid: string;
  customer?: ILookupCustomer;
  projectUid: string;
  project?: IProject;
  siteUid: string;
  site?: IProjectSite;
  mileageExceptionUid?: string;
  value: number;
  mileageException?: ILookupMileageException;
  date: string;
  start: string;
  end: string;
  hours?: number;
  description: string;
  rateUid?: string;
  rateAmount?: number;
  rateTotalAmount?: number;
  statusType: string;
  status?: ICommonSystem;
  notes?: string;
  isMileage: boolean;
  isHoliday: boolean;
  isWeekend: boolean;
  changes?: IBaseChanges;
}