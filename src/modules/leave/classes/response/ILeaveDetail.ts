import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILeaveId } from '@leave/classes/response';
import {
  IOrganizationHierarchy,
  IOrganizationWorkflow
} from '@organization/interfaces';

export interface ILeaveDetail {
  uid:              string;
  employeeUid:      string;
  employee?:         IAccountEmployee;
  hierarchyUid:     string;
  hierarchy?:       IOrganizationHierarchy;
  date:             string;
  leaveType:        string;
  leave?:           ICommonSystem;
  regularType?:     string;
  regular?:         ILeaveId;
  start:            string;
  end:              string;
  reEntry:          string;
  address:          string;
  contactNumber:    string;
  reason:           string;
  statusType:       string;
  status?:          ICommonSystem;
  rejectedReason?:  string;
  isNotified:       boolean;
  requestedLeave?:  number ;
  histories?:       History[];
  workflow?:        IOrganizationWorkflow;
  changes?:         IBaseChanges;       
}