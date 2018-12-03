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
  infoTitle: { id: `${prefix}.section.title` },
  infoSubHeader: { id: `${prefix}.section.subHeader` },
  customerTitle: { id: `${prefix}.section.title` },
  customerSubHeader: { id: `${prefix}.section.subHeader` },

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
  namePlaceholder: { id: `${prefix}.field.name.placeholder`},
  nameRequired: { id: `${prefix}.field.name.required`},
  npwp: { id: `${prefix}.field.npwp`},
  npwpPlaceholder: { id: `${prefix}.field.npwp.placeholder`},
  companyUid: { id: `${prefix}.field.companyUid`},
  companyUidPlaceholder: { id: `${prefix}.field.companyUid.placeholder`},
  companyUidRequired: { id: `${prefix}.field.companyUid.required`},
  phone: { id: `${prefix}.field.phone`},
  phonePlaceholder: { id: `${prefix}.field.phone.placeholder`},
  phoneAdditional: { id: `${prefix}.field.phoneAdditional`},
  phoneAdditionalPlaceholder: { id: `${prefix}.field.phoneAdditional.placeholder`},
  email: { id: `${prefix}.field.email`},
  emailPlaceholder: { id: `${prefix}.field.email.placeholder`},
  address: { id: `${prefix}.field.address`},
  addressPlaceholder: { id: `${prefix}.field.address.placeholder`},
  addressAdditional: { id: `${prefix}.field.addressAdditional`},
  addressAdditionalPlaceholder: { id: `${prefix}.field.addressAdditional.placeholder`},
  mobile: { id: `${prefix}.field.mobile`},
  mobilePlaceholder: { id: `${prefix}.field.mobile.placeholder`},
  mobileAdditional: { id: `${prefix}.field.mobileAdditional`},
  mobileAdditionalPlaceholder: { id: `${prefix}.field.mobileAdditional.placeholder`},
  fax: { id: `${prefix}.field.fax`},
  faxPlaceholder: { id: `${prefix}.field.fax.placeholder`},
  contactPerson: { id: `${prefix}.field.contactPerson`},
  contactPersonPlaceholder: { id: `${prefix}.field.contactPerson.placeholder`},
  contactPersonAdditional: { id: `${prefix}.field.contactPersonAdditional`},
  contactPersonAdditionalPlaceholder: { id: `${prefix}.field.contactPersonAdditional.placeholder`},
  contactTitle: { id: `${prefix}.field.contactTitle`},
  contactTitlePlaceholder: { id: `${prefix}.field.contactTitle.placeholder`},
  contactTitleAdditional: { id: `${prefix}.field.contactTitleAdditional`},
  contactTitleAdditionalPlaceholder: { id: `${prefix}.field.contactTitleAdditional.placeholder`},
  isActive: { id: `${prefix}.field.isActive`},
  
  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});

export const customerFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return lookupCustomerFields.uid;
      case 'name': return lookupCustomerFields.name;
      case 'npwp': return lookupCustomerFields.npwp;
      case 'companyUid': return lookupCustomerFields.companyUid;
      case 'phone': return lookupCustomerFields.phone;
      case 'phoneAdditional': return lookupCustomerFields.phoneAdditional;
      case 'email': return lookupCustomerFields.email;
      case 'address': return lookupCustomerFields.address;
      case 'addressAdditional': return lookupCustomerFields.addressAdditional;
      case 'mobile': return lookupCustomerFields.mobile;
      case 'mobileAdditional': return lookupCustomerFields.mobileAdditional;
      case 'fax': return lookupCustomerFields.fax;
      case 'contactPerson': return lookupCustomerFields.contactPerson;
      case 'contactPersonAdditional': return lookupCustomerFields.contactPersonAdditional;
      case 'contactTitle': return lookupCustomerFields.contactTitle;
      case 'contactTitleAdditional': return lookupCustomerFields.contactTitleAdditional;
      case 'isActive': return lookupCustomerFields.isActive;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return lookupCustomerFields.nameRequired;
      case 'companyUid': return lookupCustomerFields.companyUidRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return lookupCustomerFields.companyUidPlaceholder;
      case 'name': return lookupCustomerFields.namePlaceholder;
      case 'npwp': return lookupCustomerFields.npwpPlaceholder;
      case 'companyUid': return lookupCustomerFields.companyUidPlaceholder;
      case 'phone': return lookupCustomerFields.phonePlaceholder;
      case 'phoneAdditional': return lookupCustomerFields.phoneAdditionalPlaceholder;
      case 'email': return lookupCustomerFields.emailPlaceholder;
      case 'address': return lookupCustomerFields.addressPlaceholder;
      case 'addressAdditional': return lookupCustomerFields.addressAdditionalPlaceholder;
      case 'mobile': return lookupCustomerFields.mobilePlaceholder;
      case 'mobileAdditional': return lookupCustomerFields.mobileAdditionalPlaceholder;
      case 'fax': return lookupCustomerFields.faxPlaceholder;
      case 'contactPerson': return lookupCustomerFields.contactPersonPlaceholder;
      case 'contactPersonAdditional': return lookupCustomerFields.contactPersonAdditionalPlaceholder;
      case 'contactTitle': return lookupCustomerFields.contactTitlePlaceholder;
      case 'contactTitleAdditional': return lookupCustomerFields.contactPersonAdditionalPlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const lookupCustomerMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});