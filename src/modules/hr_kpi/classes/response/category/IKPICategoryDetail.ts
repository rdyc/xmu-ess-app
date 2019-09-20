import { IBaseChanges } from '@generic/interfaces';

export interface IKPICategoryDetail {
  uid: string;
  name: string;
  group: 'KPI' | 'Personal';
  groupName: string;
  measurementCount: number;
  changes?: IBaseChanges;
}