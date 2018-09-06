import { EmployeeAccessListType } from './EmployeeAccessListType';
import { EmergencyContactType } from './EmergencyContactType';
import { BankAccountType } from './BankAccountType';
import { CommonSystemType } from '../../common/types/CommonSystemType';
import { LookupCompanyType } from '../../lookup/types/LookupCompanyType';

export interface EmployeeMyType {
    uid: string;
    companyUid: string | null;
    company: LookupCompanyType | null;
    employmentNumber: string;
    employmentType: string;
    employment: CommonSystemType | null;
    fullName: string;
    dateOfBirth: Date | null;
    birthPlace: string | null;
    email: string;
    emailPersonal: string  | null;
    address: string  | null;
    addressAdditional: string | null;
    genderType: string | null;
    gender: CommonSystemType | null;
    religionType: string | null;
    religion: CommonSystemType | null;
    taxType: string | null;
    tax: CommonSystemType | null;
    bloodType: string | null;
    blood: CommonSystemType | null;
    familyCardNumber: string | null;
    citizenNumber: string | null;
    taxNumber: string | null;
    bpjsEmploymentNumber: string | null;
    bpjsHealthCareNumber: string | null;
    bank: BankAccountType | null;
    contact: EmergencyContactType | null;
    image: string | null;
    access: EmployeeAccessListType[];
}