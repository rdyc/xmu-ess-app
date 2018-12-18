import { travelAction } from './travelActionMessage';
import { travelApprovalConfirm, travelApprovalPage } from './travelApprovalMessages';
import { 
  travelRequestConfirm, 
  travelRequestDialog, 
  travelRequestField, 
  travelRequestFieldHelperFor, 
  travelRequestMessage, 
  travelRequestOption,
  travelRequestPage,
  travelRequestSection
} 
from './travelRequestMessage';
import { travelSettlementApprovalConfirm, travelSettlementApprovalPage } from './travelSettlementApprovalMessages';
import { 
  travelSettlementConfirm, 
  travelSettlementField, 
  travelSettlementMessage, 
  travelSettlementPage, 
  travelSettlementSection } 
from './travelSettlementMessage';

export const travelMessage = {
  action: travelAction,
  request: {
    page: travelRequestPage,
    dialog: travelRequestDialog,
    option: travelRequestOption,
    confirm: travelRequestConfirm,
    section: travelRequestSection,
    field: travelRequestField,
    fieldFor: travelRequestFieldHelperFor,
    message: travelRequestMessage
  },
  settlement: {
    page: travelSettlementPage,
    confirm: travelSettlementConfirm,
    section: travelSettlementSection,
    field: travelSettlementField,
    message: travelSettlementMessage
  },
  requestApproval: {
    page: travelApprovalPage,
    confirm: travelApprovalConfirm
  },
  settlementApproval: {
    page: travelSettlementApprovalPage,
    confirm: travelSettlementApprovalConfirm
  }
};