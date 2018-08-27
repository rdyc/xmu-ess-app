import { LookupCompanyType } from '../../lookup/types/LookupCompanyType';
import { LookupRoleType } from '../../lookup/types/LookupRoleType';
import { CommonSystemType } from '../../common/types/CommonSystemType';
import { LookupPositionType } from '../../lookup/types/LookupPositionType';

export interface AccountEmployeeAccessType {
    uid: string;
    companyUid: string;
    company: LookupCompanyType;
    positionUid: string;
    position: LookupPositionType;
    roleUid: string | null;
    role: LookupRoleType | null;
    levelType: string | null;
    level: CommonSystemType | null;
    unitType: string | null;
    unit: CommonSystemType | null;
}