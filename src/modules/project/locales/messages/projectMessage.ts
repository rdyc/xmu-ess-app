import {
  projectAcceptanceDialog,
  projectAcceptanceMessage,
  projectAcceptancePage,
  projectAcceptanceSection,
} from './projectAcceptanceMessage';
import { projectAction } from './projectActionMessage';
import {
  projectAssignmentAction,
  projectAssignmentField,
  projectAssignmentFieldHelperFor,
  projectAssignmentPage,
  projectAssignmentSection,
  projectAssignmentSubmission,
} from './projectAssignmentMessage';
import { projectRegistrationField } from './projectRegistrationMessage';

export const projectMessage = {
  action: projectAction,
  registration: {
    field: projectRegistrationField
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
