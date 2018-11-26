import { summaryEffectivenessHeader, summaryEffectivenessPage } from './summaryEffectivenessMessages';
import { summaryFilterField } from './summaryFilterMessages';
import { summaryProfitabilityDialog, summaryProfitabilityHeader, summaryProfitabilityPage } from './summaryProfitabilityMessages';
import { summaryProgressDialog, summaryProgressHeader, summaryProgressHeaderHelper, summaryProgressPage } from './summaryProgressMessages';

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
  effectiveness: {
    page: summaryEffectivenessPage,
    header: summaryEffectivenessHeader
  },
};