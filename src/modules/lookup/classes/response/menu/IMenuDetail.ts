import { IMenuParentDetail } from '@lookup/classes/response';

export interface IMenuDetail {
  uid:                string;
  name?:               string | null;
  parentUid?:          string | null;
  parent?:             IMenuParentDetail | null;
  description?:        string | null;
  isAdminAccess?:      string | null;
}