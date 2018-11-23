import { 
  financeApprovalAction, 
  financeApprovalDialog, 
  financeApprovalField, 
  financeApprovalMessage, 
  financeApprovalPage, 
  financeApprovalSection 
} from './financeApprovalMessage';

export const financeMessage = {
  approval: {
    message: financeApprovalMessage,
    field: financeApprovalField,
    action: financeApprovalAction,
    page: financeApprovalPage,
    section: financeApprovalSection,
    dialog: financeApprovalDialog,
  },
};