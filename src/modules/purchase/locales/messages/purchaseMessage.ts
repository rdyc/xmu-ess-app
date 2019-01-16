import { purchaseAction } from './purchaseAction';
import { purchaseApprovalConfirm, purchaseApprovalMessage, purchaseApprovalPage, purchaseApprovalSection } from './purchaseApprovalMessage';
import { purchaseComplement } from './purchaseComplement';
import { purchaseItemField } from './purchaseItemMessage';
import { purchaseRequestConfirm, purchaseRequestField, purchaseRequestMessage, purchaseRequestPage, purchaseRequestSection, purchaseRequestFieldHelperFor } from './purchaseRequestMessage';
import { purchaseSettlementConfirm, purchaseSettlementField, purchaseSettlementMessage, purchaseSettlementPage, purchaseSettlementSection } from './purchaseSettlementMessage';
import { settlementApprovalConfirm, settlementApprovalMessage, settlementApprovalPage, settlementApprovalSection } from './settlementApprovalMessage';

export const purchaseMessage = {
  action: purchaseAction,
  complement: purchaseComplement,
  request: {
    pages: purchaseRequestPage,
    section: purchaseRequestSection,
    field: purchaseRequestField,
    items: purchaseItemField,
    confirm: purchaseRequestConfirm,
    fieldFor: purchaseRequestFieldHelperFor,
    message: purchaseRequestMessage
  },
  s_approval: {
    pages: settlementApprovalPage,
    confirm: settlementApprovalConfirm,
    section: settlementApprovalSection,
    message: settlementApprovalMessage,
  },
  approval: {
    pages: purchaseApprovalPage,
    confirm: purchaseApprovalConfirm,
    section: purchaseApprovalSection,
    message: purchaseApprovalMessage,
  },
  settlement: {
    pages: purchaseSettlementPage,
    section: purchaseSettlementSection,
    field: purchaseSettlementField,
    items: purchaseItemField,
    fieldFor: purchaseSettlementFieldHelperFor,
    confirm: purchaseSettlementConfirm,
    message: purchaseSettlementMessage,
  },
};
