import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer } from '@lookup/classes';
import { IProject, IProjectSite } from '@project/classes/response';

export interface ITravelRequest {
  uid: string; 
  employeeUid: string;
  employee: IAccountEmployee | null;
  positionUid: string;
  // position: ILookupPosition | null;
  destinationType: string;
  destination: ICommonSystem | null;
  start: string;
  end: string;
  customerUid: string;
  customer: ILookupCustomer | null;
  projectUid: string;
  project: IProject | null;
  siteUid: string | null;
  site: IProjectSite | null;
  activityType: string;
  activity: ICommonSystem | null;
  objective: string | null;
  target: string | null;
  comment: string | null;
  total: number;
  statusType: string;
  status: ICommonSystem | null;
  rejectReason: string | null;
  changes: IBaseChanges | null;
}