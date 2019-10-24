import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { ILookupCustomer } from '@lookup/classes';
import { ISummaryMappingAssignments } from './ISummaryMappingAssignment';

export interface ISummaryMappingProject {
  uid: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectType: string;
  project?: ICommonSystem;
  name: string;
  description?: string;
  start: string;
  end: string;
  valueIdr: number;
  maxHours: number;
  statusType: string;
  status?: ICommonSystem;
  childProjectUid?: string;
  ownerEmployeeUid: string;
  ownerEmployee?: IAccountEmployee;
  allocatedHours: number;
  actualHours: number;
  allocatedMandays: number;
  actualMandays: number;
  assignments?: ISummaryMappingAssignments;
}