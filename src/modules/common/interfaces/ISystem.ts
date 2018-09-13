import { IBaseChanges } from '../../../generic/interfaces/IBaseChanges';

export interface ISystem {
    id: number;
    type: string;
    companyUid: string;
    name: string;
    description: string | null;
    isActive: boolean;
    changes: IBaseChanges;
}