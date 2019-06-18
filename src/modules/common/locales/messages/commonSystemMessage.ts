import { defineMessages } from 'react-intl';

const prefix = 'common';
const fieldPrefix = `${prefix}.field`;

export const commonSystemMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

export const commonSystemPage = defineMessages({
  title: { id: `${prefix}.title`},
  subTitle: { id: `${prefix}.subTitle`},
  detailTitle: { id: `${prefix}.detail.title`},
  detailSubTitle: { id: `${prefix}.detail.subTitle`},
  createTitle: { id: `${prefix}.form.newTitle`},
  createSubTitle: { id: `${prefix}.form.newSubTitle`},
  editTitle: { id: `${prefix}.form.editTitle`},
  editSubTitle: { id: `${prefix}.form.editSubTitle`},
});

export const commonSystemSection = defineMessages({
  submit: { id: `${prefix}.submit`},
  title: { id: `${prefix}.infoTitle`},
  subTitle: { id: `${prefix}.infoSubTitle`},
});

export const commonSystemDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
  editTitle: { id: `${prefix}.dialog.editTitle`},
  editDescription: { id: `${prefix}.dialog.editDescription`},
});

export const commonSystemText = defineMessages({
  active: {id: `${prefix}.text.active`},
  inActive: {id: `${prefix}.text.inActive`},
  businessUnit: {id: `${prefix}.text.businessUnit`},
});

export const commonSystemField = defineMessages({
  id: {id: `${fieldPrefix}.id`},
  category: {id: `${fieldPrefix}.category`},

  companyUid: {id: `${fieldPrefix}.companyUid`},
  companyUidPlaceholder: {id: `${fieldPrefix}.companyUid.placeholder`},

  parentCode: {id: `${fieldPrefix}.parentCode`},
  parentCodePlaceholder: {id: `${fieldPrefix}.parentCode.placeholder`},

  name: {id: `${fieldPrefix}.name`},
  namePlaceholder: {id: `${fieldPrefix}.name.placeholder`},
  nameRequired: {id: `${fieldPrefix}.name.required`},

  type: {id: `${fieldPrefix}.type`},

  description: {id: `${fieldPrefix}.description`},
  descriptionPlaceholder: {id: `${fieldPrefix}.description.placeholder`},
  descriptionRequired: {id: `${fieldPrefix}.description.required`},
  
  isActive: {id: `${fieldPrefix}.isActive`},
});

export const commonSystemFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'id' : return commonSystemField.id;
      case 'category' : return commonSystemField.category;
      case 'companyUid' : return commonSystemField.companyUid;
      case 'parentCode' : return commonSystemField.parentCode;
      case 'name' : return commonSystemField.name;
      case 'type' : return commonSystemField.type;
      case 'description' : return commonSystemField.description;
      case 'isActive' : return commonSystemField.isActive;
      
      default : return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name' : return commonSystemField.namePlaceholder;
      case 'description' : return commonSystemField.descriptionPlaceholder;
      
      default : return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'companyUid' : return commonSystemField.parentCode;
      case 'name' : return commonSystemField.namePlaceholder;
      case 'description' : return commonSystemField.descriptionPlaceholder;
      
      default : return {id: field};
    }
  }

  return {id: field};
};