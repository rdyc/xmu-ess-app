import { ChangesType } from '../../@base/ChangesType';

export interface SystemType {
    id: number;
    type: string;
    companyUid: string;
    name: string;
    description: string | null;
    isActive: boolean;
    changes: ChangesType;
}