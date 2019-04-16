export interface IEmployeePutPayload {
  uid: string;
  // information
  companyUid: string;
  employmentNumber: string;
  employmentType: string;
  fullName: string;
  joinDate: string;
  inactiveDate?: string | null;
  dateOfBirth: string;
  birthPlace: string;
  genderType: string;
  taxType?: string;
  religionType: string | null;
  bloodType?: string | null;
  // bank
  familyCardNumber: string;
  citizenNumber: string;
  taxNumber: string;
  bpjsEmploymentNumber?: string | null;
  bpjsHealthCareNumber?: string | null;
  bankAccount: string;
  bankAccountName: string;
  bankAccountBranch?: string | null;
  // contact  
  address: string;
  addressAdditional?: string;
  email?: string;
  emailPersonal?: string;
  phone?: string;
  mobilePhone?: string | null;
  emergencyContactName?: string | null;
  emergencyContactRelation?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactPhoneAdditional?: string | null;
  image?: string | null;
}