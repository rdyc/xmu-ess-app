import { ICommonSystem } from '@common/classes';
import { ILookupCompany, ILookupPosition, ILookupRole, ILookupRoleMenuList } from '@lookup/classes';

export interface IEmployeeAccessList {
    uid: string;
    companyUid: string;
    company: ILookupCompany | null;
    roleUid: string | null;
    role: ILookupRole | null;
    positionUid: string;
    position: ILookupPosition | null;
    menus: ILookupRoleMenuList[] | null;
    unitType: string | null;
    unit: ICommonSystem | null;
    departmentType: string | null;
    department: ICommonSystem | null;
    levelType: string | null;
    level: ICommonSystem | null;
    start: Date;
    end: Date | null;
    isActive: boolean;
    isExpired: boolean;
}