import { IBaseChanges } from '@generic/interfaces';

export interface ISystemDetail {
    id: number;
    type: string;
    companyUid: string;
    name: string;
    description: string | null;
    isActive: boolean;
    changes: IBaseChanges;
}