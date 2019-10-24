import { IBaseChanges } from '@generic/interfaces';

export interface IKPICategory {
  uid: string;
  name: string;
  group: 'KPI' | 'Personal';
  groupName: string;
  measurementCount: number;
  changes?: IBaseChanges;
}