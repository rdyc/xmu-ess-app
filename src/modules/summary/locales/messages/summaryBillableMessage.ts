import { defineMessages } from 'react-intl';

const prefix = 'summary.billable';

export const summaryBillablePage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`}
});

export const summaryBillableField = defineMessages({
  company: { id: `${prefix}.field.company`},
  name: { id: `${prefix}.field.name`},
  start: { id: `${prefix}.field.start`},
  end: { id: `${prefix}.field.end`}
});

export const summaryBillableNote = defineMessages({
  note: { id: `${prefix}.note`},
  totalHours: { id: `${prefix}.totalhours`},
  percentage: { id: `${prefix}.percentage`}
});

export const summaryBillableHover = defineMessages({
  presales: { id: `${prefix}.hover.presales`},
  nonPresales: { id: `${prefix}.hover.nonPresales`}
});