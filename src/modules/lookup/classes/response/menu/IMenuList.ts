import { IMenuParentList } from '@lookup/classes/response';

export interface IMenuList {
  uid:                string;
  name?:               string;
  parentUid?:          string;
  parent?:             IMenuParentList;
  description?:        string;
  isAdminAccess?:      string;
}