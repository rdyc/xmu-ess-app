import { defineMessages } from 'react-intl';

const prefix = 'lookup.leave';

// page
export const leavePage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
});

// confirmation
export const leaveConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// field
export const leaveField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  company: { id: `${prefix}.field.company`},
  category: { id: `${prefix}.field.category`},
  name: { id: `${prefix}.field.name`},
  description: { id: `${prefix}.field.description`},
  year: { id: `${prefix}.field.year`},
  allocation: { id: `${prefix}.field.allocation`},
  isWithHoliday: { id: `${prefix}.field.isWithHoliday`},

  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});