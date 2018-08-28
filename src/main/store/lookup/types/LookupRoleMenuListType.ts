import { LookupRoleMenuChildListType } from './LookupRoleMenuChildListType';

export interface LookupRoleMenuListType {
    uid: string;
    name: string;
    childs: LookupRoleMenuChildListType[] | null;
}