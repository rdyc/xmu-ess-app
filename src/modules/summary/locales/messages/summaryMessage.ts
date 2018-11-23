import { summaryBillableField, summaryBillableHover, summaryBillableNote, summaryBillablePage } from './summaryBillableMessage';
import { summaryWinningRatioField, summaryWinningRatioHover, summaryWinningRatioPage } from './summaryWinningRatioMessage';

export const summaryMessage = {
  billable: {
    page: summaryBillablePage,
    field: summaryBillableField,
    note: summaryBillableNote,
    hover: summaryBillableHover
  },
  winningRatio: {
    page: summaryWinningRatioPage,
    field: summaryWinningRatioField,
    hover: summaryWinningRatioHover
  },
};