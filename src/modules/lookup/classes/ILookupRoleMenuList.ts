import { ILookupRoleMenuChildList } from './ILookupRoleMenuChildList';

export interface ILookupRoleMenuList {
    uid: string;
    name: string;
    childs: ILookupRoleMenuChildList[] | null;
}