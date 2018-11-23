import { summaryBillableHeader, summaryBillablePage } from './summaryBillableMessages';
import { summaryEffectivenessHeader, summaryEffectivenessPage } from './summaryEffectivenessMessages';
import { summaryFilterField } from './summaryFilterMessages';
import { summaryProfitabilityDialog, summaryProfitabilityHeader, summaryProfitabilityPage } from './summaryProfitabilityMessages';
import { summaryProgressDialog, summaryProgressHeader, summaryProgressHeaderHelper, summaryProgressPage } from './summaryProgressMessages';
import { summaryWinningDialog, summaryWinningHeader, summaryWinningPage } from './summaryWinningMessages';

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
    header: summaryProfitabilityHeader
  },
  billable: {
    page: summaryBillablePage,
    header: summaryBillableHeader
  },
  effectiveness: {
    page: summaryEffectivenessPage,
    header: summaryEffectivenessHeader
  },
  winning: {
    page: summaryWinningPage,
    dialog: summaryWinningDialog,
    header: summaryWinningHeader
  }
};