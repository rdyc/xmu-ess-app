import { IMenuParent } from '@lookup/classes/response';

export interface IMenu {
  uid:                string;
  name?:               string | null;
  parentUid?:          string | null;
  parent?:             IMenuParent | null;
  description?:        string | null;
  isAdminAccess?:      string | null;
}