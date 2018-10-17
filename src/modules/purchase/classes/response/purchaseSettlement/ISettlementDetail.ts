import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IOrganizationHierarchy, IOrganizationWorkflow } from '@organization/interfaces';
import { IProject } from '@project/classes/response';
import { IPurchaseItem } from './IPurchaseItem';
import { ISettlementHistory } from './ISettlementHistory';

export interface ISettlementDetail {
  uid: string;
  date: string;
  projectUid: string | null;
  project: IProject | null;
  currencyType: string;
  currency: ICommonSystem | null;
  rate: number | null;
  notes: string | null;
  request: number | null;
  requestIDR: number | null;
  advance: number | null;
  reason: string | null;
  statusType: string | null;
  status: ICommonSystem | null;
  hierarchyUid: string;
  hierarchy: IOrganizationHierarchy | null;
  customerUid: string;
  customer: ILookupCustomer | null;
  isNotified: boolean | null;
  items: IPurchaseItem[] | null;
  histories: ISettlementHistory[] | null;
  workflow: IOrganizationWorkflow | null;
  changes: IBaseChanges;
}