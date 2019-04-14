import { travelAction } from './travelActionMessage';
import { 
  travelApprovalConfirm, 
  travelApprovalOption, 
  travelApprovalPage 
} from './travelApprovalMessages';
import { 
  travelRequestConfirm, 
  travelRequestDialog, 
  travelRequestField, 
  travelRequestFieldHelperFor, 
  travelRequestMessage, 
  travelRequestOption,
  travelRequestPage,
  travelRequestSection,
  travelRequestSubmission
} from './travelRequestMessage';
import { 
  travelSettlementApprovalConfirm, 
  travelSettlementApprovalOption, 
  travelSettlementApprovalPage 
} from './travelSettlementApprovalMessages';
import { 
  travelSettlementConfirm, 
  travelSettlementDialog, 
  travelSettlementField, 
  travelSettlementMessage, 
  travelSettlementPage, 
  travelSettlementSection
} from './travelSettlementMessage';

export const travelMessage = {
  action: travelAction,
  request: {
    page: travelRequestPage,
    dialog: travelRequestDialog,
    option: travelRequestOption,
    confirm: travelRequestConfirm,
    submission: travelRequestSubmission,
    section: travelRequestSection,
    field: travelRequestField,
    fieldFor: travelRequestFieldHelperFor,
    message: travelRequestMessage
  },
  settlement: {
    page: travelSettlementPage,
    dialog: travelSettlementDialog,
    confirm: travelSettlementConfirm,
    section: travelSettlementSection,
    field: travelSettlementField,
    message: travelSettlementMessage
  },
  requestApproval: {
    page: travelApprovalPage,
    confirm: travelApprovalConfirm,
    option: travelApprovalOption
  },
  settlementApproval: {
    page: travelSettlementApprovalPage,
    option: travelSettlementApprovalOption,
    confirm: travelSettlementApprovalConfirm
  }
};