import { ILookupLeave } from '@lookup/classes';

export interface ILeaveId {
  leaveRequestUid:      string;
  leaveUid:             string;
  leave?:                ILookupLeave | null;
}