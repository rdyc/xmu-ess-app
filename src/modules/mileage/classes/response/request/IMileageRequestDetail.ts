import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IMileageRequestItem } from '@mileage/classes/response';
import {
  IOrganizationHierarchy,
  IOrganizationWorkflow
} from '@organization/interfaces';
import { ITimesheet } from '@timesheet/classes/response';

export interface IMileageRequestDetail {
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy;
  items?: IMileageRequestItem[];
  histories?: History[];
  timesheets?: ITimesheet[];
  workflow?: IOrganizationWorkflow;
  changes?: IBaseChanges;
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  month: number;
  year: number;
  period?: string;
  amount: number;
  statusType: string;
  status?: ICommonSystem;
  notes?: string;
  isNotified: boolean;
}
