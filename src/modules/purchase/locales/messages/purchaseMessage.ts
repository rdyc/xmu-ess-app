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
import { purchaseItemField } from './purchaseItemMessage';
import { purchaseRequestField } from './purchaseRequestMessage';
import { purchaseSettlementField } from './purchaseSettlementMessage';

export const purchaseMessage = {
  request: {
    field: purchaseRequestField,
    items: purchaseItemField,
  },
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
