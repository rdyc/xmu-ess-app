import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCustomer, ILookupPosition } from '@lookup/classes';
import { IProject, IProjectSite } from '@project/classes/response';

export interface ITravelSettlement {
  uid: string; 
  travelUid: string;
  employeeUid: string;
  employee?: IAccountEmployee;
  positionUid: string;
  position?: ILookupPosition;
  destinationType: string;
  destination?: ICommonSystem;
  start: string;
  end: string;
  customerUid: string;
  customer?: ILookupCustomer;
  projectUid: string;
  project?: IProject;
  siteUid: string;
  site?: IProjectSite;
  activityType: string;
  activity?: ICommonSystem;
  objective?: string;
  target?: string;
  comment?: string;
  total: number;
  statusType: string;
  status?: ICommonSystem;
  rejectReason?: string;
  changes?: IBaseChanges;
}