import { defineMessages } from 'react-intl';

const prefix = 'lookup.mileageException';

// page
export const mileageExceptionPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// confirmation
export const mileageExceptionConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// field
export const mileageExceptionField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  role: { id: `${prefix}.field.role`},
  company: { id: `${prefix}.field.company`},
  site: { id: `${prefix}.field.site`},
  reason: { id: `${prefix}.field.reason`},
  percentage: { id: `${prefix}.field.percentage`},
  description: { id: `${prefix}.field.description`},
  projectUid: { id: `${prefix}.field.projectUid`},
  inActiveDate: { id: `${prefix}.field.inactiveDate`},
  projectName: { id: `${prefix}.field.project.name`},
  projectSite: { id: `${prefix}.field.project.site`},

  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});