import { IMenuParentList } from '@lookup/classes';

export interface IMenuDetailList {
  uid:                string;
  name?:               string | null;
  parentUid?:          string | null;
  parent?:             IMenuParentList | null;
  description?:        string | null;
  isAdminAccess?:      string | null;
}