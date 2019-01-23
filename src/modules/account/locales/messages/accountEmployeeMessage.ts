import { defineMessages } from 'react-intl';

const prefix = 'account.employee';

// page
export const accountEmployeePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
});

// filter
export const accountEmployeeFilter = defineMessages({
  company: { id: `${prefix}.filter.company`},
  role: { id: `${prefix}.filter.role`},
});

// field
export const accountEmployeeField = defineMessages({
  // information detail
  title: { id: `${prefix}.field.information.title`},
  subHeader: { id: `${prefix}.field.information.subHeader`},

  contactTitle: { id: `${prefix}.field.information.contact.title`},
  contactSubHeader: { id: `${prefix}.field.information.contact.subHeader`},

  bankTitle: { id: `${prefix}.field.information.bank.title`},
  bankSubHeader: { id: `${prefix}.field.information.bank.subHeader`},

  // basic
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  
  company: { id: `${prefix}.field.company`},
  companyPlaceholder: { id: `${prefix}.field.company.placeholder`},
  companyRequired: { id: `${prefix}.field.company.required`},

  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},

  nik: { id: `${prefix}.field.nik`},
  nikPlaceholder: { id: `${prefix}.field.nik.placeholder`},
  nikRequired: { id: `${prefix}.field.nik.required`},

  joinDate: { id: `${prefix}.field.joinDate`},
  joinDatePlaceholder: { id: `${prefix}.field.joinDate.placeholder`},
  joinDateRequired: { id: `${prefix}.field.joinDate.required`},

  inactiveDate: { id: `${prefix}.field.inactiveDate`},
  inactiveDatePlaceholder: { id: `${prefix}.field.inactiveDate.placeholder`},

  employment: { id: `${prefix}.field.employment`},
  employmentPlaceholder: { id: `${prefix}.field.employment.placeholder`},
  employmentRequired: { id: `${prefix}.field.employment.required`},

  rate: { id: `${prefix}.field.rate`},
  ratePlaceholder: { id: `${prefix}.field.rate.placeholder`},

  gender: { id: `${prefix}.field.gender`},
  genderPlaceholder: { id: `${prefix}.field.gender.placeholder`},
  genderRequired: { id: `${prefix}.field.gender.required`},

  birthPlace: { id: `${prefix}.field.birthPlace`},
  birthPlacePlaceholder: { id: `${prefix}.field.birthPlace.placeholder`},
  birthPlaceRequired: { id: `${prefix}.field.birthPlace.required`},

  birthDate: { id: `${prefix}.field.birthDate`},
  birthDatePlaceholder: { id: `${prefix}.field.birthDate.placeholder`},
  birthDateRequired: { id: `${prefix}.field.birthDate.required`},

  blood: { id: `${prefix}.field.blood`},
  bloodPlaceholder: { id: `${prefix}.field.blood.placeholder`},
  bloodRequired: { id: `${prefix}.field.blood.required`},

  ptkp: { id: `${prefix}.field.ptkp`},
  ptkpPlaceholder: { id: `${prefix}.field.ptkp.placeholder`},
  ptkpRequired: { id: `${prefix}.field.ptkp.required`},

  image: { id: `${prefix}.field.image`},
  imagePlaceholder: { id: `${prefix}.field.image.placeholder`},
  imageRequired: { id: `${prefix}.field.image.required`},

  religion: { id: `${prefix}.field.religion`},
  religionPlaceholder: { id: `${prefix}.field.religion.placeholder`},
  religionRequired: { id: `${prefix}.field.religion.required`},

  // contacts  
  phone: { id: `${prefix}.field.phone`},
  phonePlaceholder: { id: `${prefix}.field.phone.placeholder`},
  phoneRequired: { id: `${prefix}.field.phone.required`},

  mobile: { id: `${prefix}.field.mobile`},
  mobilePlaceholder: { id: `${prefix}.field.mobile.placeholder`},
  mobileRequired: { id: `${prefix}.field.mobile.required`},

  emergencyName: { id: `${prefix}.field.emergencyName`},
  emergencyNamePlaceholder: { id: `${prefix}.field.emergencyName.placeholder`},

  emergencyRelation: { id: `${prefix}.field.emergencyRelation`},
  emergencyRelationPlaceholder: { id: `${prefix}.field.emergencyRelation.placeholder`},

  emergencyPhone1: { id: `${prefix}.field.emergencyPhone1`},
  emergencyPhone1Placeholder: { id: `${prefix}.field.emergencyPhone1.placeholder`},

  emergencyPhone2: { id: `${prefix}.field.emergencyPhone2`},
  emergencyPhone2Placeholder: { id: `${prefix}.field.emergencyPhone2.placeholder`},

  email: { id: `${prefix}.field.email`},
  emailPlaceholder: { id: `${prefix}.field.email.placeholder`},
  emailRequired: { id: `${prefix}.field.email.required`},

  companyEmail: { id: `${prefix}.field.companyEmail`},
  companyEmailPlaceholder: { id: `${prefix}.field.companyEmail.placeholder`},
  companyEmailRequired: { id: `${prefix}.field.companyEmail.required`},

  addressKtp: { id: `${prefix}.field.addressKtp`},
  addressKtpPlaceholder: { id: `${prefix}.field.addressKtp.placeholder`},
  addressKtpRequired: { id: `${prefix}.field.addressKtp.required`},

  addressNpwp: { id: `${prefix}.field.addressNpwp`},
  addressNpwpPlaceholder: { id: `${prefix}.field.addressNpwp.placeholder`},
  addressNpwpRequired: { id: `${prefix}.field.addressNpwp.required`},

  // bank
  ktp: { id: `${prefix}.field.ktp`},
  ktpPlaceholder: { id: `${prefix}.field.ktp.placeholder`},
  ktpRequired: { id: `${prefix}.field.ktp.required`},

  npwp: { id: `${prefix}.field.npwp`},
  npwpPlaceholder: { id: `${prefix}.field.npwp.placeholder`},
  npwpRequired: { id: `${prefix}.field.npwp.required`},

  kartuKeluarga: { id: `${prefix}.field.kartuKeluarga`},
  kartuKeluargaPlaceholder: { id: `${prefix}.field.kartuKeluarga.placeholder`},
  kartuKeluargaRequired: { id: `${prefix}.field.kartuKeluarga.required`},

  bpjsKetenagakerjaan: { id: `${prefix}.field.bpjsKetenagakerjaan`},
  bpjsKetenagakerjaanPlaceholder: { id: `${prefix}.field.bpjsKetenagakerjaan.placeholder`},
  bpjsKetenagakerjaanRequired: { id: `${prefix}.field.bpjsKetenagakerjaan.required`},

  bpjsKesehatan: { id: `${prefix}.field.bpjsKesehatan`},
  bpjsKesehatanPlaceholder: { id: `${prefix}.field.bpjsKesehatan.placeholder`},
  bpjsKesehatanRequired: { id: `${prefix}.field.bpjsKesehatan.required`},

  bcaNumber: { id: `${prefix}.field.bca.number`},
  bcaNumberPlaceholder: { id: `${prefix}.field.bca.number.placeholder`},
  bcaNumberRequired: { id: `${prefix}.field.bca.number.required`},

  bcaName: { id: `${prefix}.field.bca.name`},
  bcaNamePlaceholder: { id: `${prefix}.field.bca.name.placeholder`},
  bcaNameRequired: { id: `${prefix}.field.bca.name.required`},

  bcaBranch: { id: `${prefix}.field.bca.branch`},
  bcaBranchPlaceholder: { id: `${prefix}.field.bca.branch.placeholder`},
});

// confirmation
export const accountEmployeeConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.subHeader` },
});

// messages
export const accountEmployeeMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success`},
  deleteFailure: { id: `${prefix}.message.delete.failure`},
});

// section
export const accountEmployeeSection = defineMessages({
  basicTitle: { id: `${prefix}.section.basic.title`},
  basicSubHeader: { id: `${prefix}.section.basic.subHeader`},
  
  bankTitle: { id: `${prefix}.section.bank.title`},
  bankSubHeader: { id: `${prefix}.section.bank.subHeader`},

  contactTitle: { id: `${prefix}.section.contact.title`},
  contactSubHeader: { id: `${prefix}.section.contact.subHeader`},
});

// helper
export const accountEmployeeFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      // basic
      case 'uid': return accountEmployeeField.uid;
      case 'employmentNumber': return accountEmployeeField.nik;
      case 'fullName': return accountEmployeeField.name;
      case 'genderType': return accountEmployeeField.gender;
      case 'birthPlace': return accountEmployeeField.birthPlace;
      case 'dateOfBirth': return accountEmployeeField.birthDate;
      case 'companyUid': return accountEmployeeField.company;
      case 'employmentType': return accountEmployeeField.employment;
      case 'joinDate': return accountEmployeeField.joinDate;
      case 'taxType': return accountEmployeeField.ptkp;
      case 'image': return accountEmployeeField.image;
      case 'inactiveDate': return accountEmployeeField.inactiveDate;
      case 'bloodType': return accountEmployeeField.blood;
      case 'religionType': return accountEmployeeField.religion;    
  
      // bank
      case 'citizenNumber': return accountEmployeeField.ktp;
      case 'taxNumber': return accountEmployeeField.npwp;
      case 'familyCardNumber': return accountEmployeeField.kartuKeluarga;    
      case 'bpjsEmploymentNumber': return accountEmployeeField.bpjsKetenagakerjaan;
      case 'bpjsHealthCareNumber': return accountEmployeeField.bpjsKesehatan;
      case 'bankAccount': return accountEmployeeField.bcaNumber;
      case 'bankAccountName': return accountEmployeeField.bcaName;
      case 'bankAccountBranch': return accountEmployeeField.bcaBranch;    
  
      // contacts
      case 'address': return accountEmployeeField.addressKtp;
      case 'addressAdditional': return accountEmployeeField.addressNpwp;
      case 'email': return accountEmployeeField.companyEmail;
      case 'emailPersonal': return accountEmployeeField.email;
      case 'phone': return accountEmployeeField.phone;    
      case 'mobilePhone': return accountEmployeeField.mobile;
      case 'emergencyContactName': return accountEmployeeField.emergencyName;
      case 'emergencyContactRelation': return accountEmployeeField.emergencyRelation;
      case 'emergencyContactPhone': return accountEmployeeField.emergencyPhone1;
      case 'emergencyContactPhoneAdditional': return accountEmployeeField.emergencyPhone2;    
  
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      // basic
      case 'employmentNumber': return accountEmployeeField.nikRequired;
      case 'fullName': return accountEmployeeField.nameRequired;
      case 'genderType': return accountEmployeeField.genderRequired;
      case 'birthPlace': return accountEmployeeField.birthPlaceRequired;
      case 'dateOfBirth': return accountEmployeeField.birthDateRequired;
      case 'companyUid': return accountEmployeeField.companyRequired;
      case 'employmentType': return accountEmployeeField.employmentRequired;
      case 'joinDate': return accountEmployeeField.joinDateRequired;
      case 'taxType': return accountEmployeeField.ptkpRequired;
      case 'religionType': return accountEmployeeField.religionRequired;
      case 'bloodType': return accountEmployeeField.bloodRequired;
      case 'image': return accountEmployeeField.imageRequired;

      // bank
      case 'citizenNumber': return accountEmployeeField.ktpRequired;
      case 'taxNumber': return accountEmployeeField.npwpRequired;
      case 'familyCardNumber': return accountEmployeeField.kartuKeluargaRequired;    
      case 'bankAccount': return accountEmployeeField.bcaNumberRequired;
      case 'bankAccountName': return accountEmployeeField.bcaNameRequired;
      case 'bpjsEmploymentNumber': return accountEmployeeField.bpjsKetenagakerjaanRequired;
      case 'bpjsHealthCareNumber': return accountEmployeeField.bpjsKesehatanRequired;
  
      // contacts
      case 'address': return accountEmployeeField.addressKtpRequired;
      case 'addressAdditional': return accountEmployeeField.addressNpwpRequired;
      case 'email': return accountEmployeeField.companyEmailRequired;
      case 'emailPersonal': return accountEmployeeField.emailRequired;
      case 'phone': return accountEmployeeField.phoneRequired;    
      case 'mobilePhone': return accountEmployeeField.mobileRequired;    
  
      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      // basic
      case 'uid': return accountEmployeeField.uidPlaceholder;
      case 'employmentNumber': return accountEmployeeField.nikPlaceholder;
      case 'fullName': return accountEmployeeField.namePlaceholder;
      case 'genderType': return accountEmployeeField.genderPlaceholder;
      case 'birthPlace': return accountEmployeeField.birthPlacePlaceholder;
      case 'dateOfBirth': return accountEmployeeField.birthDatePlaceholder;
      case 'companyUid': return accountEmployeeField.companyPlaceholder;
      case 'employmentType': return accountEmployeeField.employmentPlaceholder;
      case 'joinDate': return accountEmployeeField.joinDatePlaceholder;
      case 'taxType': return accountEmployeeField.ptkpPlaceholder;
      case 'image': return accountEmployeeField.imagePlaceholder;
      case 'inactiveDate': return accountEmployeeField.inactiveDatePlaceholder;
      case 'bloodType': return accountEmployeeField.bloodPlaceholder;
      case 'religionType': return accountEmployeeField.religionPlaceholder;    
  
      // bank
      case 'citizenNumber': return accountEmployeeField.ktpPlaceholder;
      case 'taxNumber': return accountEmployeeField.npwpPlaceholder;
      case 'familyCardNumber': return accountEmployeeField.kartuKeluargaPlaceholder;    
      case 'bpjsEmploymentNumber': return accountEmployeeField.bpjsKetenagakerjaanPlaceholder;
      case 'bpjsHealthCareNumber': return accountEmployeeField.bpjsKesehatanPlaceholder;
      case 'bankAccount': return accountEmployeeField.bcaNumberPlaceholder;
      case 'bankAccountName': return accountEmployeeField.bcaNamePlaceholder;
      case 'bankAccountBranch': return accountEmployeeField.bcaBranchPlaceholder;    
  
      // contacts
      case 'address': return accountEmployeeField.addressKtpPlaceholder;
      case 'addressAdditional': return accountEmployeeField.addressNpwpPlaceholder;
      case 'email': return accountEmployeeField.companyEmailPlaceholder;
      case 'emailPersonal': return accountEmployeeField.emailPlaceholder;
      case 'phone': return accountEmployeeField.phonePlaceholder;    
      case 'mobilePhone': return accountEmployeeField.mobilePlaceholder;
      case 'emergencyContactName': return accountEmployeeField.emergencyNamePlaceholder;
      case 'emergencyContactRelation': return accountEmployeeField.emergencyRelationPlaceholder;
      case 'emergencyContactPhone': return accountEmployeeField.emergencyPhone1Placeholder;
      case 'emergencyContactPhoneAdditional': return accountEmployeeField.emergencyPhone2Placeholder;    
  
      default: return {id: field};
    }
  }

  return {id: field};
};