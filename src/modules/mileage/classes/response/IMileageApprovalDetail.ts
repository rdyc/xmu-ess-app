import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IMileageRequestItem } from '@mileage/classes/response';
import {
  IOrganizationHierarchy,
  IOrganizationWorkflow
} from '@organization/interfaces';

export interface IMileageApprovalDetail {
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy | null;
  items?: IMileageRequestItem[] | null;
  histories?: History[] | null;
  workflow?: IOrganizationWorkflow | null;
  changes?: IBaseChanges | null;
  uid: string;
  employeeUid: string;
  employee?: IAccountEmployee | null;
  month: number;
  year: number;
  period?: string | null;
  amount: number;
  statusType: string;
  status?: ICommonSystem | null;
  notes?: string | null;
  isNotified: boolean;
}