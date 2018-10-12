import { IMenuParentList } from '@lookup/classes/response';

export interface IMenuList {
  uid:                string;
  name?:               string | null;
  parentUid?:          string | null;
  parent?:             IMenuParentList | null;
  description?:        string | null;
  isAdminAccess?:      string | null;
}