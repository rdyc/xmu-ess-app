import { defineMessages } from 'react-intl';

const prefix = 'summary.winningRatio';

export const summaryWinningRatioPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`},
  detail: { id: `${prefix}.page.detail.title`}
});

export const summaryWinningRatioField = defineMessages({
  company: { id: `${prefix}.field.company`},
  companyRequired: { id: `${prefix}.field.company.required`},
  name: { id: `${prefix}.field.name`},
  start: { id: `${prefix}.field.start`},
  startRequired: { id: `${prefix}.field.start.required`},
  end: { id: `${prefix}.field.end`},
  endRequired: { id: `${prefix}.field.end.required`},
  null: { id: `${prefix}.field.null`}
});

export const summaryWinningRatioHover = defineMessages({
  closed: { id: `${prefix}.hover.closed`},
  onProgress: { id: `${prefix}.hover.onProgress`},
  win: { id: `${prefix}.hover.win`}
});