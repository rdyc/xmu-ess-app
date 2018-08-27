import { AccountEmployeeAccessType } from './AccountEmployeeAccessType';

export interface AccountEmployeeMyType {
    uid: string;
    employmentNumber: string;
    fullName: string;
    birthPlace: string;
    dateOfBirth: Date;
    email: string;
    address: string;
    access: AccountEmployeeAccessType[];
}