import { defineMessages } from 'react-intl';

const prefix = 'summary.profitability';
const headerPrefix = `${prefix}.header`;

export const summaryProfitabilityPage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
});

export const summaryProfitabilityDialog = defineMessages({
  title: {id: `${prefix}.dialog.title`},
  close: {id: `${prefix}.dialog.close`},
});

export const summaryProfitabilityHeader = defineMessages({
  actualRate: {id: `${headerPrefix}.actualRate`},
  maxHours: {id: `${headerPrefix}.maxHours`},
  allocatedHours: {id: `${headerPrefix}.allocatedHours`},
  actualHours: {id: `${headerPrefix}.actualHours`},
  remainHours: {id: `${headerPrefix}.remainHours`},
  progress: {id: `${headerPrefix}.progress`},
  actualRates: {id: `${headerPrefix}.actualRates`},
  actualCosts: {id: `${headerPrefix}.actualCosts`},
  cogs: {id: `${headerPrefix}.cogs`},
  consultant: {id: `${headerPrefix}.consultant`},
  allocated: {id: `${headerPrefix}.allocated`},
  actual: {id: `${headerPrefix}.actual`},
  remaining: {id: `${headerPrefix}.remaining`},
  progressAssignment: {id: `${headerPrefix}.progressAssignment`},
  totalValue: {id: `${headerPrefix}.totalValue`},
  totalCogs: {id: `${headerPrefix}.totalCogs`},
  profit: {id: `${headerPrefix}.profit`},
  percentage: {id: `${headerPrefix}.percentage`},
  type: {id: `${headerPrefix}.type`},
  date: {id: `${headerPrefix}.date`},
  documentUid: {id: `${headerPrefix}.documentUid`},
  requester: {id: `${headerPrefix}.requester`},
  amount: {id: `${headerPrefix}.amount`},
});