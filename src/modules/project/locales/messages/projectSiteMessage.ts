import { defineMessages } from 'react-intl';

const prefix = 'project.site';

// page
export const projectSitePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  deleteTitle: { id: `${prefix}.page.delete.title` },
  deleteSubHeader: { id: `${prefix}.page.delete.subHeader` },
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

// messages
export const projectSiteMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// fields
export const projectSiteField = defineMessages({
  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  
  siteType: { id: `${prefix}.field.siteType` },
  siteTypeRequired: { id: `${prefix}.field.siteType.required` },
  siteTypePlaceholder: { id: `${prefix}.field.siteType.placeholder` },

  value: { id: `${prefix}.field.value` },
  valueRequired: { id: `${prefix}.field.value.required` },
  valuePlaceholder: { id: `${prefix}.field.value.placeholder` },
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