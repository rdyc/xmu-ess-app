import { defineMessages } from 'react-intl';

const prefix = 'lookup.holiday';

// page
export const holidayPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// confirmation
export const holidayConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// field
export const holidayField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  company: { id: `${prefix}.field.role`},
  description: { id: `${prefix}.field.site`},
  date: { id: `${prefix}.field.reason`},

  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});