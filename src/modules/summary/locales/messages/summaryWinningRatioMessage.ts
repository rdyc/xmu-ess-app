import { defineMessages } from 'react-intl';

const prefix = 'summary.winningRatio';

export const summaryWinningRatioPage = defineMessages({
  title: { id: `${prefix}.page.title`},
  subHeader: { id: `${prefix}.page.subHeader`},
  detail: { id: `${prefix}.page.detail.title`}
});

export const summaryWinningRatioField = defineMessages({
  company: { id: `${prefix}.field.company`},
  name: { id: `${prefix}.field.name`},
  start: { id: `${prefix}.field.start`},
  end: { id: `${prefix}.field.end`},
  null: { id: `${prefix}.field.null`}
});

export const summaryWinningRatioHover = defineMessages({
  closed: { id: `${prefix}.hover.closed`},
  onProgress: { id: `${prefix}.hover.onProgress`},
  win: { id: `${prefix}.hover.win`}
});