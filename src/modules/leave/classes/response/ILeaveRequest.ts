import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IAccountEmployee } from '@account/classes';
import { ILeaveId } from '@leave/classes/response';,

export interface ILeaveRequest {
  uid:              string;
  employeeUid:      string;
  employee:         IAccountEmployee | null;
  date:             string;
  leaveType:        string;
  leave?:           ICommonSystem | null;
  regular?:          ILeaveId | null;
  start:            string;
  end:              string;
  reEntry:          string;
  address:          string;
  contactNumber:    string;
  reason:           string;
  statusType:       string;
  status?:          ICommonSystem | null;
  rejectedReason?:  string | null;
  requestedLeave?:  number | null;
  changes?:         IBaseChanges | null;       
}