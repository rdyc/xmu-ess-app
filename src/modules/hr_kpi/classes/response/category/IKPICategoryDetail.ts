import { IBaseChanges } from '@generic/interfaces';

export interface IKPICategoryDetail {
  uid: string;
  name: string;
  group: 'kPI' | 'personal';
  groupName: string;
  measurementCount: number;
  changes?: IBaseChanges;
}