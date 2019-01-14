import { IAccountEmployee } from '@account/classes';
import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILeaveId } from '@leave/classes/response';

export interface ILeave {
  uid:              string;
  employeeUid:      string;
  employee?:         IAccountEmployee;
  date:             string;
  leaveType:        string;
  leave?:           ICommonSystem;
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
  requestedLeave?:  number;
  changes?:         IBaseChanges;       
}