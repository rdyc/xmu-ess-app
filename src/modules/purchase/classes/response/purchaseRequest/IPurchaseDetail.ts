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
  projectUid: string;
  project: IProject | null;
  currencyType: string;
  currency: ICommonSystem | null;
  rate: number;
  notes: string | null;
  request: number;
  requestIDR: number;
  advance: number;
  reason: string | null;
  statusType: string;
  status: ICommonSystem | null;
  hierarchyUid: string;
  hierarchy: IOrganizationHierarchy | null;
  customerUid: string;
  customer: ILookupCustomer | null;
  isNotified: boolean | null;
  items: IPurchaseItemRequest[] | null;
  histories: IPurchaseHistory[] | null;
  workflow: IOrganizationWorkflow | null;
  changes: IBaseChanges;
}