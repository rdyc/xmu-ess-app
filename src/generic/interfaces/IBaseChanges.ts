import { IUserAccount } from './IUserAccount';

export interface IBaseChanges {
    createdBy: string;
    created: IUserAccount | null;
    createdAt: Date;
    updatedBy: string | null;
    updated: IUserAccount | null;
    updatedAt: Date | null;
}