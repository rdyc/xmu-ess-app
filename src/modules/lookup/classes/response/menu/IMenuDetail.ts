import { IMenuParentDetail } from '@lookup/classes/response';

export interface IMenuDetail {
  uid:                string;
  name?:               string;
  parentUid?:          string;
  parent?:             IMenuParentDetail;
  description?:        string;
  isAdminAccess?:      string;
}