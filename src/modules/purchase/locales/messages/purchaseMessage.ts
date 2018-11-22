// import {
//   projectAcceptanceDialog,
//   projectAcceptanceMessage,
//   projectAcceptancePage,
//   projectAcceptanceSection,
// } from './projectAcceptanceMessage';
// import {
//   projectAssignmentAction,
//   projectAssignmentField,
//   projectAssignmentFieldHelperFor,
//   projectAssignmentPage,
//   projectAssignmentSection,
//   projectAssignmentSubmission,
// } from './projectAssignmentMessage';
import { purchaseAction } from './purchaseAction';
import { purchaseItemField } from './purchaseItemMessage';
import { purchaseRequestField, purchaseRequestPage, purchaseRequestSection } from './purchaseRequestMessage';
import { purchaseSettlementField } from './purchaseSettlementMessage';

export const purchaseMessage = {
  action: purchaseAction,
  request: {
    pages: purchaseRequestPage,
    section: purchaseRequestSection,
    field: purchaseRequestField,
    items: purchaseItemField,
  },
  // approval: {
  //   pages: purchase
  //   section: 
  // }
  settlement: {
    field: purchaseSettlementField,
    items: purchaseItemField,
  },
  // assignment: {
  //   page: projectAssignmentPage,
  //   section: projectAssignmentSection,
  //   action: projectAssignmentAction,
  //   field: projectAssignmentField,
  //   for: projectAssignmentFieldHelperFor,
  //   submission: projectAssignmentSubmission
  // },
  // acceptance: {
  //   page: projectAcceptancePage,
  //   section: projectAcceptanceSection,
  //   dialog: projectAcceptanceDialog,
  //   message: projectAcceptanceMessage,
  // }
};
