export interface IKPICategoryList {
  uid: string;
  name: string;
  group: 'kPI' | 'personal';
  groupName: string;
  measurementCount: number;
}