import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';
import { ICommonSystem } from '..';

export interface ISystemDetail {
    id: number;
    type: string;
    companyUid: string | null;
    company: ILookupCompany | null;
    name: string;
    parentCode: string | null;
    parent: ICommonSystem | null;
    description: string | null;
    isActive: boolean;
    changes: IBaseChanges;
}