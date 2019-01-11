import { IMenuParent } from '@lookup/classes/response';

export interface IMenu {
  uid:                string;
  name?:               string;
  parentUid?:          string;
  parent?:             IMenuParent;
  description?:        string;
  isAdminAccess?:      string;
}