import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IOrganizationHierarchy, IOrganizationWorkflow } from '@organization/interfaces';
import { IProject } from '@project/classes/response';
import { IPurchaseHistory } from './IPurchaseHistory';
import { IPurchaseItemRequest } from './IPurchaseItemRequest';

export interface IPurchaseDetail {
  uid: string;
  date: string;
  projectUid?: string;
  project?: IProject;
  currencyType: string;
  currency?: ICommonSystem;
  rate?: number;
  notes?: string;
  request?: number;
  requestIDR?: number;
  advance?: number;
  reason?: string;
  statusType?: string;
  status?: ICommonSystem;
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy;
  customerUid: string;
  customer?: ILookupCustomer;
  isNotified?: boolean;
  items?: IPurchaseItemRequest[];
  histories?: IPurchaseHistory[];
  workflow?: IOrganizationWorkflow;
  changes?: IBaseChanges;
}