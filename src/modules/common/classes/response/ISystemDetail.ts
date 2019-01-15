import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';
import { ICommonSystem } from '..';

export interface ISystemDetail {
    id: number;
    type: string;
    companyUid?: string;
    company?: ILookupCompany;
    name: string;
    parentCode?: string;
    parent?: ICommonSystem;
    description?: string;
    isActive: boolean;
    changes: IBaseChanges;
}