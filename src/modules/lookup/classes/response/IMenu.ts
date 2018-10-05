// import { IMenuChild } from '@lookup/classes';

export interface IMenu {
  uid:                string;
  name:               string | null;
  parentUid:          string | null;
  // parent:             IMenuChild | null;
  description:        string | null;
  isAdminAccess:      string | null;
}