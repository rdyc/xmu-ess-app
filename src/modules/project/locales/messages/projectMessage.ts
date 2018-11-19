import {
  projectAcceptanceDialog,
  projectAcceptanceMessage,
  projectAcceptancePage,
  projectAcceptanceSection,
} from './projectAcceptanceMessage';
import { projectAction } from './projectActionMessage';
import { projectApprovalPage } from './projectApprovalMessage';
import {
  projectAssignmentAction,
  projectAssignmentField,
  projectAssignmentFieldHelperFor,
  projectAssignmentPage,
  projectAssignmentSection,
  projectAssignmentSubmission,
} from './projectAssignmentMessage';
import { projectRegistrationField, projectRegistrationPage } from './projectRegistrationMessage';

export const projectMessage = {
  action: projectAction,
  registration: {
    page: projectRegistrationPage,
    field: projectRegistrationField
  },
  approval: {
    page: projectApprovalPage,
  },
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
