import { defineMessages } from 'react-intl';

const prefix = 'summary.billable';

export const summaryBillablePage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`},
  detail: { id: `${prefix}.page.detail`}
});

export const summaryBillableField = defineMessages({
  company: { id: `${prefix}.field.company`},
  companyRequired: { id: `${prefix}.field.company.required`},
  name: { id: `${prefix}.field.name`},
  start: { id: `${prefix}.field.start`},
  startRequired: { id: `${prefix}.field.start.required`},
  end: { id: `${prefix}.field.end`},
  endRequired: { id: `${prefix}.field.end.required`},
});

export const summaryBillableNote = defineMessages({
  note: { id: `${prefix}.note`},
  totalHours: { id: `${prefix}.totalhours`},
  billablePercentage: { id: `${prefix}.percentage`},
  presalesPercentage: { id: `${prefix}.percentage.presales`}
});

export const summaryBillableHover = defineMessages({
  presales: { id: `${prefix}.hover.presales`},
  nonPresales: { id: `${prefix}.hover.nonPresales`}
});