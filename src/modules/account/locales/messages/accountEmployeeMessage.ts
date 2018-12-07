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

});

// confirmation
export const accountEmployeeConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.description` },
});