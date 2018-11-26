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

export const summaryProfitabilityHeaderHelper = (field: string) => {
  switch (field) {
    case 'actualRate' : return summaryProfitabilityHeader.actualRate;
    case 'allocated': return summaryProfitabilityHeader.allocated;
    case 'actual': return summaryProfitabilityHeader.actual;
    case 'remaining': return summaryProfitabilityHeader.remaining;
    case 'progressAssignment': return summaryProfitabilityHeader.progressAssignment;
    case 'maxHours': return summaryProfitabilityHeader.allocatedHours;
    case 'allocatedHours': return summaryProfitabilityHeader.allocatedHours;
    case 'actualHours': return summaryProfitabilityHeader.actualHours;
    case 'remainHours': return summaryProfitabilityHeader.remainHours;
    case 'progress': return summaryProfitabilityHeader.progress;
    case 'actualRates': return summaryProfitabilityHeader.actualRates;
    case 'actualCosts': return summaryProfitabilityHeader.actualCosts;
    case 'cogs': return summaryProfitabilityHeader.cogs;
    case 'type': return summaryProfitabilityHeader.type;
    case 'date': return summaryProfitabilityHeader.date;
    case 'documentUid': return summaryProfitabilityHeader.documentUid;
    case 'requester': return summaryProfitabilityHeader.requester;
    default: return {id: field};
  }
};