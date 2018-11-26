import { summaryBillableField, summaryBillableHover, summaryBillableNote, summaryBillablePage } from './summaryBillableMessage';
import { summaryEffectivenessHeader, summaryEffectivenessPage } from './summaryEffectivenessMessages';
import { summaryFilterField } from './summaryFilterMessages';
import { summaryProfitabilityDialog, summaryProfitabilityHeader, summaryProfitabilityHeaderHelper, summaryProfitabilityPage } from './summaryProfitabilityMessages';
import { summaryProgressDialog, summaryProgressHeader, summaryProgressHeaderHelper, summaryProgressPage } from './summaryProgressMessages';
import { summaryWinningRatioField, summaryWinningRatioHover, summaryWinningRatioPage } from './summaryWinningRatioMessage';

export const summaryMessage = {
  filter: summaryFilterField,
  progress: {
    page: summaryProgressPage,
    dialog: summaryProgressDialog,
    header: summaryProgressHeader,
    headerFor: summaryProgressHeaderHelper
  },
  profitability: {
    page: summaryProfitabilityPage,
    dialog: summaryProfitabilityDialog,
    header: summaryProfitabilityHeader,
    headerFor: summaryProfitabilityHeaderHelper
  },
  effectiveness: {
    page: summaryEffectivenessPage,
    header: summaryEffectivenessHeader
  },
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