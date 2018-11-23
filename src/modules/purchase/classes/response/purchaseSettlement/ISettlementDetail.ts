import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IOrganizationHierarchy, IOrganizationWorkflow } from '@organization/interfaces';
import { IProject } from '@project/classes/response';
import { IPurchaseItem } from './IPurchaseItem';
import { ISettlementHistory } from './ISettlementHistory';

export interface ISettlementDetail {
  uid: string;
  date?: string;
  projectUid?: string;
  project?: IProject | null;
  currencyType: string;
  currency?: ICommonSystem | null;
  rate: number;
  notes?: string | null;
  request?: number;
  requestInIDR?: number;
  actual?: number;
  actualInIDR?: number;
  difference?: number;  
  differenceInIDR?: number;
  advance?: number;
  balanceDue?: number;
  reject?: string | null;
  statusType?: string;
  status?: ICommonSystem | null;
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy | null;
  customerUid: string;
  customer?: ILookupCustomer | null;
  isNotified?: boolean | null;
  items?: IPurchaseItem[] | null;
  histories?: ISettlementHistory[] | null;
  workflow?: IOrganizationWorkflow | null;
  changes?: IBaseChanges;
}