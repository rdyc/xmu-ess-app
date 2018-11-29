import { defineMessages } from 'react-intl';

const prefix = 'lookup.customer';

// page
export const lookupCustomerPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// section
export const lookupCustomerSection = defineMessages({
  infoTitle: { id: `${prefix}.section.customer.title` },
  infoSubHeader: { id: `${prefix}.section.customer.subHeader` },
  customerTitle: { id: `${prefix}.section.customer.title` },
  customerSubHeader: { id: `${prefix}.section.customer.subHeader` },

});

// confirmation
export const lookupCustomerConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  
});

// field
export const lookupCustomerFields = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  name: { id: `${prefix}.field.name`},
  npwp: { id: `${prefix}.field.npwp`},
  company: { id: `${prefix}.field.companyUid`},
  phone: { id: `${prefix}.field.phone`},
  phoneAdditional: { id: `${prefix}.field.phoneAdditional`},
  email: { id: `${prefix}.field.email`},
  address: { id: `${prefix}.field.address`},
  addressAdditional: { id: `${prefix}.field.addressAdditional`},
  mobile: { id: `${prefix}.field.mobile`},
  mobileAdditional: { id: `${prefix}.field.mobileAdditional`},
  fax: { id: `${prefix}.field.fax`},
  contactPerson: { id: `${prefix}.field.contactPerson`},
  contactPersonAdditional: { id: `${prefix}.field.contactPersonAdditional`},
  contactTitle: { id: `${prefix}.field.contactTitle`},
  contactTitleAdditional: { id: `${prefix}.field.contactTitleAdditional`},
  isActive: { id: `${prefix}.field.isActive`},
  
  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});