import { LookupCompanyType } from '../../lookup/types/LookupCompanyType';
import { LookupRoleType } from '../../lookup/types/LookupRoleType';
import { CommonSystemType } from '../../common/types/CommonSystemType';
import { LookupPositionType } from '../../lookup/types/LookupPositionType';
import { LookupRoleMenuListType } from '../../lookup/types/LookupRoleMenuListType';

export interface EmployeeAccessListType {
    uid: string;
    companyUid: string;
    company: LookupCompanyType | null;
    roleUid: string | null;
    role: LookupRoleType | null;
    positionUid: string;
    position: LookupPositionType | null;
    menus: LookupRoleMenuListType | null;
    unitType: string | null;
    unit: CommonSystemType | null;
    departmentType: string | null;
    department: CommonSystemType | null;
    levelType: string | null;
    level: CommonSystemType | null;
    start: Date;
    end: Date | null;
    isActive: boolean;
    isExpired: boolean;
}