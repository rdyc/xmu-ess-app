import { defineMessages } from 'react-intl';

const prefix = 'summary.progress';
const headerPrefix = `${prefix}.header`;

export const summaryProgressPage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
});

export const summaryProgressDialog = defineMessages({
  title: {id: `${prefix}.dialog.title`},
  close: {id: `${prefix}.dialog.close`},
});

export const summaryProgressHeader = defineMessages({
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

export const summaryProgressHeaderHelper = (field: string) => {
  switch (field) {
    case 'allocated': return summaryProgressHeader.allocated;
    case 'actual': return summaryProgressHeader.actual;
    case 'remaining': return summaryProgressHeader.remaining;
    case 'progressAssignment': return summaryProgressHeader.progressAssignment;
    case 'maxHours': return summaryProgressHeader.allocatedHours;
    case 'allocatedHours': return summaryProgressHeader.allocatedHours;
    case 'actualHours': return summaryProgressHeader.actualHours;
    case 'remainHours': return summaryProgressHeader.remainHours;
    case 'progress': return summaryProgressHeader.progress;
    case 'actualRates': return summaryProgressHeader.actualRates;
    case 'actualCosts': return summaryProgressHeader.actualCosts;
    case 'cogs': return summaryProgressHeader.cogs;
    case 'type': return summaryProgressHeader.type;
    case 'date': return summaryProgressHeader.date;
    case 'documentUid': return summaryProgressHeader.documentUid;
    case 'requester': return summaryProgressHeader.requester;
    default: return {id: field};
  }

  return {id: field};
};