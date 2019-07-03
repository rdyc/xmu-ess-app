import { ICommonSystem } from '@common/classes';
import { ILookupCustomer } from '@lookup/classes';

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
  owner: string;
}