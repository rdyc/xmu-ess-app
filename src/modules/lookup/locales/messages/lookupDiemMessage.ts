import { defineMessages } from 'react-intl';

const prefix = 'lookup.diem';

// page
export const lookupDiemPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// section
export const lookupDiemSection = defineMessages({
  infoTitle: { id: `${prefix}.section.diem.title` },
  infoSubHeader: { id: `${prefix}.section.diem.subHeader` },
  diemTitle: { id: `${prefix}.section.diem.title` },
  diemSubHeader: { id: `${prefix}.section.diem.subHeader` },

});

// confirmation
export const lookupDiemConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  
});

// field
export const lookupDiemField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  destination: { id: `${prefix}.field.destinationType`},
  project: { id: `${prefix}.field.projectType`},
  company: { id: `${prefix}.field.companyUid`},
  currency: { id: `${prefix}.field.currencyUid`},
  travel: { id: `${prefix}.field.travelType`},
  value: { id: `${prefix}.field.value`},
  
  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});