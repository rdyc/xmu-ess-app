import { defineMessages } from 'react-intl';

const prefix = 'summary.effectiveness';
const headerPrefix = `${prefix}.header`;

export const summaryEffectivenessPage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
});

export const summaryEffectivenessHeader = defineMessages({
  name: {id: `${headerPrefix}.name`},
  positionRole: {id: `${headerPrefix}.positionRole`},
  project: {id: `${headerPrefix}.project`},
  customer: {id: `${headerPrefix}.customer`},
  allocated: {id: `${headerPrefix}.allocated`},
  actual: {id: `${headerPrefix}.actual`},
  remaining: {id: `${headerPrefix}.remaining`},
  progress: {id: `${headerPrefix}.progress`},
});