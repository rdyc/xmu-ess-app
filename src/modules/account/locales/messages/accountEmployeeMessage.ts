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
});

// field
export const accountEmployeeField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  
  company: { id: `${prefix}.field.company`},
  companyPlaceholder: { id: `${prefix}.field.company.placeholder`},

  name: { id: `${prefix}.field.name`},
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},

  nik: { id: `${prefix}.field.nik`},
  nikPlaceholder: { id: `${prefix}.field.nik.placeholder`},

  email: { id: `${prefix}.field.email`},
  emailPlaceholder: { id: `${prefix}.field.email.placeholder`},

  phone: { id: `${prefix}.field.phone`},
  phonePlaceholder: { id: `${prefix}.field.phone.placeholder`},

  joinDate: { id: `${prefix}.field.joinDate`},
  joinDatePlaceholder: { id: `${prefix}.field.joinDate.placeholder`},

  inactiveDate: { id: `${prefix}.field.inactiveDate`},
  inactiveDatePlaceholder: { id: `${prefix}.field.inactiveDate.placeholder`},

  employement: { id: `${prefix}.field.employement`},
  employementPlaceholder: { id: `${prefix}.field.employement.placeholder`},

  rate: { id: `${prefix}.field.rate`},
  ratePlaceholder: { id: `${prefix}.field.rate.placeholder`},

  gender: { id: `${prefix}.field.gender`},
  genderPlaceholder: { id: `${prefix}.field.gender.placeholder`},

  birthPlace: { id: `${prefix}.field.birthPlace`},
  birthPlacePlaceholder: { id: `${prefix}.field.birthPlace.placeholder`},

  birthDate: { id: `${prefix}.field.birthDate`},
  birthDatePlaceholder: { id: `${prefix}.field.birthDate.placeholder`},

  blood: { id: `${prefix}.field.blood`},
  bloodPlaceholder: { id: `${prefix}.field.blood.placeholder`},

  ktp: { id: `${prefix}.field.ktp`},
  ktpPlaceholder: { id: `${prefix}.field.ktp.placeholder`},

  npwp: { id: `${prefix}.field.npwp`},
  npwpPlaceholder: { id: `${prefix}.field.npwp.placeholder`},

  ptkp: { id: `${prefix}.field.ptkp`},
  ptkpPlaceholder: { id: `${prefix}.field.ptkp.placeholder`},

  kartuKeluarga: { id: `${prefix}.field.kartuKeluarga`},
  kartuKeluargaPlaceholder: { id: `${prefix}.field.kartuKeluarga.placeholder`},

  bpjsKetenagakerjaan: { id: `${prefix}.field.bpjsKetenagakerjaan`},
  bpjsKetenagakerjaanPlaceholder: { id: `${prefix}.field.bpjsKetenagakerjaan.placeholder`},

  bpjsKesehatan: { id: `${prefix}.field.bpjsKesehatan`},
  bpjsKesehatanPlaceholder: { id: `${prefix}.field.bpjsKesehatan.placeholder`},

  // information detail
  title: { id: `${prefix}.field.information.title`},
  subHeader: { id: `${prefix}.field.information.subHeader`},

  contactTitle: { id: `${prefix}.field.information.contact.title`},
  contactSubHeader: { id: `${prefix}.field.information.contact.subHeader`},

  bankTitle: { id: `${prefix}.field.information.bank.title`},
  bankSubHeader: { id: `${prefix}.field.information.bank.subHeader`},

  // contacts
  mobile: { id: `${prefix}.field.mobile`},
  mobilePlaceholder: { id: `${prefix}.field.mobile.placeholder`},

  emergencyName: { id: `${prefix}.field.emergencyName`},
  emergencyNamePlaceholder: { id: `${prefix}.field.emergencyName.placeholder`},

  emergencyRelation: { id: `${prefix}.field.emergencyRelation`},
  emergencyRelationPlaceholder: { id: `${prefix}.field.emergencyRelation.placeholder`},

  emergencyPhone1: { id: `${prefix}.field.emergencyPhone1`},
  emergencyPhone1Placeholder: { id: `${prefix}.field.emergencyPhone1.placeholder`},

  emergencyPhone2: { id: `${prefix}.field.emergencyPhone2`},
  emergencyPhone2Placeholder: { id: `${prefix}.field.emergencyPhone2.placeholder`},

  companyEmail: { id: `${prefix}.field.companyEmail`},
  companyEmailPlaceholder: { id: `${prefix}.field.companyEmail.placeholder`},

  addressKtp: { id: `${prefix}.field.addressKtp`},
  addressKtpPlaceholder: { id: `${prefix}.field.addressKtp.placeholder`},

  addressNpwp: { id: `${prefix}.field.addressNpwp`},
  addressNpwpPlaceholder: { id: `${prefix}.field.addressNpwp.placeholder`},

  // bank
  bcaNumber: { id: `${prefix}.field.bca.number`},
  bcaNumberPlaceholder: { id: `${prefix}.field.bca.number.placeholder`},

  bcaName: { id: `${prefix}.field.bca.name`},
  bcaNamePlaceholder: { id: `${prefix}.field.bca.name.placeholder`},

  bcaBranch: { id: `${prefix}.field.bca.branch`},
  bcaBranchPlaceholder: { id: `${prefix}.field.bca.branch.placeholder`},
});

// confirmation
export const accountEmployeeConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
});