import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILeaveId } from '@leave/classes/response';
import {
  IOrganizationHierarchy,
  IOrganizationWorkflow
} from '@organization/interfaces';

export interface ILeaveRequestDetail {
  uid:              string;
  employeeUid:      string;
  employee:         IAccountEmployee | null;
  hierarchyUid:     string;
  hierarchy?:       IOrganizationHierarchy | null;
  date:             string;
  leaveType:        string;
  leave?:           ICommonSystem | null;
  regularType:      string | null;
  regular?:         ILeaveId | null;
  start:            string;
  end:              string;
  reEntry:          string;
  address:          string;
  contactNumber:    string;
  reason:           string;
  statusType:       string;
  status?:          ICommonSystem | null;
  rejectedReason?:  string | null;
  isNotified:       boolean;
  requestedLeave?:  number | null;
  histories?:       History[];
  workflow?:        IOrganizationWorkflow | null;
  changes:          IBaseChanges | null;       
}