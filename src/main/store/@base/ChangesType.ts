import { UserAccountType } from './UserAccountType';

export interface ChangesType {
    createdBy: string;
    created: UserAccountType | null;
    createdAt: Date;
    updatedBy: string | null;
    updated: UserAccountType | null;
    updatedAt: Date | null;
}