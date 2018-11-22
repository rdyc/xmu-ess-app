import { purchaseAction } from './purchaseAction';
import { purchaseApprovalConfirm, purchaseApprovalPage, purchaseApprovalSection } from './purchaseApprovalMessage';
import { purchaseItemField } from './purchaseItemMessage';
import { purchaseRequestConfirm, purchaseRequestField, purchaseRequestMessage, purchaseRequestPage, purchaseRequestSection } from './purchaseRequestMessage';
import { purchaseSettlementConfirm, purchaseSettlementField, purchaseSettlementMessage, purchaseSettlementPage, purchaseSettlementSection } from './purchaseSettlementMessage';
import { settlementApprovalConfirm, settlementApprovalPage, settlementApprovalSection } from './settlementApprovalMessage';

export const purchaseMessage = {
  action: purchaseAction,
  request: {
    pages: purchaseRequestPage,
    section: purchaseRequestSection,
    field: purchaseRequestField,
    items: purchaseItemField,
    confirm: purchaseRequestConfirm,
    message: purchaseRequestMessage
  },
  s_approval: {
    pages: settlementApprovalPage,
    confirm: settlementApprovalConfirm,
    section: settlementApprovalSection,
  },
  approval: {
    pages: purchaseApprovalPage,
    confirm: purchaseApprovalConfirm,
    section: purchaseApprovalSection
  },
  settlement: {
    pages: purchaseSettlementPage,
    section: purchaseSettlementSection,
    field: purchaseSettlementField,
    items: purchaseItemField,
    confirm: purchaseSettlementConfirm,
    message: purchaseSettlementMessage,
  },
};
