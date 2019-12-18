import { IBaseChanges } from '@generic/interfaces';

export interface ILeaveItem {
  uid: string;
  leaveUid: string;
  leaveDate: string;
  leaveDescription: string;
  changes?: IBaseChanges;
}