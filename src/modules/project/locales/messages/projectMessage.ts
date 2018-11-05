import {
  projectAcceptanceDialog,
  projectAcceptanceMessage,
  projectAcceptancePage,
  projectAcceptanceSection,
} from './projectAcceptanceMessage';
import {
  projectAssignmentAction,
  projectAssignmentField,
  projectAssignmentFieldHelperFor,
  projectAssignmentPage,
  projectAssignmentSection,
  projectAssignmentSubmission,
} from './projectAssignmentMessage';

export const projectMessage = {
  assignment: {
    page: projectAssignmentPage,
    section: projectAssignmentSection,
    action: projectAssignmentAction,
    field: projectAssignmentField,
    for: projectAssignmentFieldHelperFor,
    submission: projectAssignmentSubmission
  },
  acceptance: {
    page: projectAcceptancePage,
    section: projectAcceptanceSection,
    dialog: projectAcceptanceDialog,
    message: projectAcceptanceMessage,
  }
};
