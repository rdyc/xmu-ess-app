import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import {
  IOrganizationHierarchy,
  IOrganizationWorkflow
} from '@organization/interfaces';
import {
  IProjectDocument,
  IProjectSales,
  IProjectSite
} from '@project/classes/response';

export interface IProjectDetail {
  uid: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  hierarchyUid: string;
  hierarchy?: IOrganizationHierarchy;
  currencyType: string;
  currency?: ICommonSystem;
  contractNumber?: string;
  ownerEmployeeUid: string;
  owner?: IAccountEmployee;
  name: string;
  description?: string;
  maxHours: number;
  start: string;
  end: string;
  childProjectUid?: string;
  statusType: string;
  status?: ICommonSystem;
  rejectedReason?: string;
  rate: number;
  valueUsd: number;
  valueIdr: number;
  isNotifyToOwner: boolean;
  isNotified: boolean;
  sites: IProjectSite[];
  sales: IProjectSales[];
  documents: IProjectDocument[];
  documentPreSales: IProjectDocument[];
  histories?: History[];
  workflow?: IOrganizationWorkflow;
  changes?: IBaseChanges;
}
