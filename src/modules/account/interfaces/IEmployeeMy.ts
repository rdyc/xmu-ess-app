import { ICommonSystem } from '../../common/interfaces/ICommonSystem';
import { ILookupCompany } from '../../lookup/interfaces/ILookupCompany';
import { IEmployeeAccessList } from './IEmployeeAccessList';
import { IEmployeeBank } from './IEmployeeBank';
import { IEmployeeContact } from './IEmployeeContact';

export interface IEmployeeMy {
    uid: string;
    companyUid: string | null;
    company: ILookupCompany | null;
    employmentNumber: string;
    employmentType: string;
    employment: ICommonSystem | null;
    fullName: string;
    dateOfBirth: Date | null;
    birthPlace: string | null;
    email: string;
    emailPersonal: string  | null;
    address: string  | null;
    addressAdditional: string | null;
    genderType: string | null;
    gender: ICommonSystem | null;
    religionType: string | null;
    religion: ICommonSystem | null;
    taxType: string | null;
    tax: ICommonSystem | null;
    bloodType: string | null;
    blood: ICommonSystem | null;
    familyCardNumber: string | null;
    citizenNumber: string | null;
    taxNumber: string | null;
    bpjsEmploymentNumber: string | null;
    bpjsHealthCareNumber: string | null;
    bank: IEmployeeBank | null;
    contact: IEmployeeContact | null;
    image: string | null;
    access: IEmployeeAccessList[];
}