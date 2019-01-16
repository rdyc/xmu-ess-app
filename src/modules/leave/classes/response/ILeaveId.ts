import { ILookupLeave } from '@lookup/classes/response';

export interface ILeaveId {
  leaveRequestUid:      string;
  leaveUid:             string;
  leave?:               ILookupLeave;
}