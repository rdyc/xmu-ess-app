import { defineMessages } from 'react-intl';

const prefix = 'project.site';

// page
export const projectSitePage = defineMessages({
  title: { id: `${prefix}.page.title` },
  subHeader: { id: `${prefix}.page.subHeader` },
});

// option
export const projectSiteOption = defineMessages({
  new: { id: `${prefix}.option.new` },
  modify: { id: `${prefix}.option.modify` },
  remove: { id: `${prefix}.option.remove` }
});

// section
export const projectSiteSection = defineMessages({
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
});

// confirm
export const projectSiteConfirm = defineMessages({
  patchTitle: { id: `${prefix}.confirm.patch.title` },
  patchContent: { id: `${prefix}.confirm.patch.content` },
});

// messages
export const projectSiteMessage = defineMessages({
  patchSuccess: { id: `${prefix}.message.patch.success` },
  patchFailure: { id: `${prefix}.message.patch.failure` }
});

// fields
export const projectSiteField = defineMessages({
  uid: { id: `${prefix}.field.uid` },

  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  
  siteType: { id: `${prefix}.field.siteType` },
  siteTypeRequired: { id: `${prefix}.field.siteType.required` },
  siteTypePlaceholder: { id: `${prefix}.field.siteType.placeholder` },

  value: { id: `${prefix}.field.value` },
  valueRequired: { id: `${prefix}.field.value.required` },
  valuePlaceholder: { id: `${prefix}.field.value.placeholder` },

  itemsMinimum: { id: `${prefix}.field.itemsMinimum` }
});

export const projectSiteFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'name': return projectSiteField.name;
      case 'siteType': return projectSiteField.siteType;
      case 'value': return projectSiteField.value;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return projectSiteField.nameRequired;
      case 'siteType': return projectSiteField.siteTypeRequired;
      case 'value': return projectSiteField.valueRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return projectSiteField.namePlaceholder;
      case 'siteType': return projectSiteField.siteTypePlaceholder;
      case 'value': return projectSiteField.valuePlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};