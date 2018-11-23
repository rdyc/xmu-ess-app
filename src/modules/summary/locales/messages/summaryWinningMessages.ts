import { defineMessages } from 'react-intl';

const prefix = 'summary.winning';
const headerPrefix = `${prefix}.header`;

export const summaryWinningPage = defineMessages({
  title: {id: `${prefix}.title`},
  subTitle: {id: `${prefix}.subTitle`},
});

export const summaryWinningDialog = defineMessages({
  title: {id: `${prefix}.dialog.title`},
  close: {id: `${prefix}.dialog.close`},
  projectNull: {id: `${prefix}.dialog.projectNull`}
});

export const summaryWinningHeader = defineMessages({
  winning: {id: `${headerPrefix}.winning`},
  closed: {id: `${headerPrefix}.closed`},
  progress: {id: `${headerPrefix}.progress`},
  win: {id: `${headerPrefix}.win`},
  presales: {id: `${headerPrefix}.presales`},
  customer: {id: `${headerPrefix}.customer`},
  project: {id: `${headerPrefix}.project`},
  date: {id: `${headerPrefix}.date`},
});