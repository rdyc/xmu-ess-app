import { IBasePayload } from '@generic/interfaces';
// import { RoleMenuPayload } from './RoleMenuPayload';

export interface ILookupRolePutPayload extends IBasePayload {
  gradeType: string;
  name: string;
  description: string;
  isActive: boolean;
  // menus: RoleMenuPayload[];
}