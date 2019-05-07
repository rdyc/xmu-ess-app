import { IEmployeeBank, IEmployeeContact } from '@account/classes/response';
import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from '@lookup/classes';

import { IEmployeeAccessList } from '../IEmployeeAccessList';

export interface IEmployeeMy {
    uid: string;
    companyUid?: string;
    company?: ILookupCompany;
    employmentNumber: string;
    employmentType: string;
    employment?: ICommonSystem;
    fullName: string;
    dateOfBirth?: Date;
    birthPlace?: string;
    email: string;
    emailPersonal?: string;
    address?: string;
    addressAdditional?: string;
    genderType?: string;
    gender?: ICommonSystem;
    religionType?: string;
    religion?: ICommonSystem;
    taxType?: string;
    tax?: ICommonSystem;
    bloodType?: string;
    blood?: ICommonSystem;
    familyCardNumber?: string;
    citizenNumber?: string;
    taxNumber?: string;
    bpjsEmploymentNumber?: string;
    bpjsHealthCareNumber?: string;
    bank?: IEmployeeBank;
    contact?: IEmployeeContact;
    image?: string;
    access?: IEmployeeAccessList[];
    joinDate?: string;
    inactiveDate?: string;
}