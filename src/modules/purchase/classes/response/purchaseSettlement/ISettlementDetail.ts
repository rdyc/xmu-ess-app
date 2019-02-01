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
  project?: IProject;
  currencyType: string;
  currency?: ICommonSystem;
  rate: number;
  notes?: string;
  request?: number;
  requestInIDR?: number;
  actual?: number;
  actualInIDR?: number;
  difference?: number;  
  differenceInIDR?: number;
  advance?: number;
  balanceDue?: number;
  reason?: string;
  statusType?: string;
  status?: ICommonSystem;
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy;
  customerUid: string;
  customer?: ILookupCustomer;
  isNotified?: boolean;
  items?: IPurchaseItem[];
  histories?: ISettlementHistory[];
  workflow?: IOrganizationWorkflow;
  changes?: IBaseChanges;
}