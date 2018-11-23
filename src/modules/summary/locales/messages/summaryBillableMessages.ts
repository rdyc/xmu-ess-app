import { defineMessages } from 'react-intl';

const prefix = 'summary.billable';
const headerPrefix = `${prefix}.header`;

export const summaryBillablePage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
});

export const summaryBillableHeader = defineMessages({
  no: {id: `${headerPrefix}.no`},
  name: {id: `${headerPrefix}.name`},
  billableHours: {id: `${headerPrefix}.billableHours`},
  billable: {id: `${headerPrefix}.billable`},
  presalesBillableHours: {id: `${headerPrefix}.presalesBillableHours`},
  presalesBillable: {id: `${headerPrefix}.presalesBillable`},
});