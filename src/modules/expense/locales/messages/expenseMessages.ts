import { 
  expenseApprovalDialog, 
  expenseApprovalMessage, 
  expenseApprovalPage, 
  expenseApprovalSection 
} from './expenseApprovalMessage';
import { 
  expenseRequestAction, 
  expenseRequestDialog, 
  expenseRequestField, 
  expenseRequestFieldHelperFor, 
  expenseRequestMessage, 
  expenseRequestPage, 
  expenseRequestSection 
} from './expenseRequestMessage';

export const expenseMessages = {
  request: {
    message: expenseRequestMessage,
    page: expenseRequestPage,
    dialog: expenseRequestDialog,
    section: expenseRequestSection,
    action: expenseRequestAction,
    field: expenseRequestField,
    fieldFor: expenseRequestFieldHelperFor,
  },
  approval: {
    message: expenseApprovalMessage,
    page: expenseApprovalPage,
    section: expenseApprovalSection,
    dialog: expenseApprovalDialog,
  },
};