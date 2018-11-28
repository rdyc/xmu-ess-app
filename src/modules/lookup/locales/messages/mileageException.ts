import { defineMessages } from 'react-intl';

const prefix = 'lookup.mileageException';

// page
export const mileageExceptionPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
});

// confirmation
export const mileageExceptionConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` }
});

// messages
export const mileageExceptionMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// field
export const mileageExceptionField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  uidPlaceholder: { id: `${prefix}.field.id.placeholder`},
  
  role: { id: `${prefix}.field.role`},
  roleRequired: { id: `${prefix}.field.role.required`},
  rolePlaceholder: { id: `${prefix}.field.role.placeholder`},

  company: { id: `${prefix}.field.company`},
  companyPlaceholder: { id: `${prefix}.field.company.placeholder`},

  site: { id: `${prefix}.field.site`},
  sitePlaceholder: { id: `${prefix}.field.site.placeholder`},

  reason: { id: `${prefix}.field.reason`},
  reasonPlaceholder: { id: `${prefix}.field.reason.placeholder`},

  percentage: { id: `${prefix}.field.percentage`},
  percentageRequired: { id: `${prefix}.field.percentage.required`},
  percentagePlaceholder: { id: `${prefix}.field.percentage.placeholder`},

  description: { id: `${prefix}.field.description`},
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder`},

  projectUid: { id: `${prefix}.field.project.name`},
  projectUidPlaceholder: { id: `${prefix}.field.project.name.placeholder`},
  
  projectSite: { id: `${prefix}.field.project.site`},
  projectSitePlaceholder: { id: `${prefix}.field.project.site.placeholder`},

  inActiveDate: { id: `${prefix}.field.inactiveDate`},
  inActiveDatePlaceholder: { id: `${prefix}.field.inactiveDate.placeholder`},

  projectName: { id: `${prefix}.field.project.name`},

  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});

// section
export const mileageExceptionSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
});

// helper
export const mileageExceptionFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return mileageExceptionField.uid;
      case 'companyUid': return mileageExceptionField.company;
      case 'roleUid': return mileageExceptionField.role;
      case 'percentage': return mileageExceptionField.percentage;
      case 'projectUid': return mileageExceptionField.projectUid;
      case 'siteType': return mileageExceptionField.site;
      case 'siteUid': return mileageExceptionField.projectSite;
      case 'description': return mileageExceptionField.description;
      case 'reason': return mileageExceptionField.reason;
      case 'inactiveDate': return mileageExceptionField.inActiveDate;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'roleUid': return mileageExceptionField.roleRequired;
      case 'percentage': return mileageExceptionField.percentageRequired;      

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return mileageExceptionField.uidPlaceholder;
      case 'companyUid': return mileageExceptionField.companyPlaceholder;
      case 'roleUid': return mileageExceptionField.rolePlaceholder;
      case 'percentage': return mileageExceptionField.percentagePlaceholder;
      case 'projectUid': return mileageExceptionField.projectUidPlaceholder;
      case 'siteType': return mileageExceptionField.sitePlaceholder;
      case 'siteUid': return mileageExceptionField.projectSitePlaceholder;
      case 'description': return mileageExceptionField.descriptionPlaceholder;
      case 'reason': return mileageExceptionField.reasonPlaceholder;
      case 'inactiveDate': return mileageExceptionField.inActiveDatePlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};
