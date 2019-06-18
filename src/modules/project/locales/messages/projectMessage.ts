import {
  projectAcceptanceConfirm,
  projectAcceptanceMessage,
  projectAcceptancePage,
  projectAcceptanceSection,
} from './projectAcceptanceMessage';
import { projectApprovalConfirm, projectApprovalPage } from './projectApprovalMessage';
import {
  projectAssignmentConfirm,
  projectAssignmentField,
  projectAssignmentFieldHelperFor,
  projectAssignmentMessage,
  projectAssignmentOption,
  projectAssignmentPage,
  projectAssignmentSection,
  projectAssignmentSubmission,
} from './projectAssignmentMessage';
import {
  projectAdministrationPage,
  projectRegistrationConfirm,
  projectRegistrationField,
  projectRegistrationFieldHelperFor,
  projectRegistrationMessage,
  projectRegistrationOption,
  projectRegistrationPage,
  projectRegistrationSection,
  projectRegistrationSubmission,
} from './projectRegistrationMessage';
import {
  projectSiteConfirm,
  projectSiteField,
  projectSiteFieldHelperFor,
  projectSiteMessage,
  projectSiteOption,
  projectSitePage,
  projectSiteSection,
} from './projectSiteMessage';

export const projectMessage = {
  registration: {
    page: projectRegistrationPage,
    option: projectRegistrationOption,
    submission: projectRegistrationSubmission,
    confirm: projectRegistrationConfirm,
    section: projectRegistrationSection,
    field: projectRegistrationField,
    fieldFor: projectRegistrationFieldHelperFor,
    message: projectRegistrationMessage
  },
  administration: {
    page: projectAdministrationPage
  },
  approval: {
    page: projectApprovalPage,
    confirm: projectApprovalConfirm
  },
  site: {
    page: projectSitePage,
    option: projectSiteOption,
    section: projectSiteSection,
    field: projectSiteField,
    fieldFor: projectSiteFieldHelperFor,
    confirm: projectSiteConfirm,
    message: projectSiteMessage
  },
  assignment: {
    page: projectAssignmentPage,
    section: projectAssignmentSection,
    option: projectAssignmentOption,
    submission: projectAssignmentSubmission,
    field: projectAssignmentField,
    fieldFor: projectAssignmentFieldHelperFor,
    confirm: projectAssignmentConfirm,
    message: projectAssignmentMessage
  },
  acceptance: {
    page: projectAcceptancePage,
    section: projectAcceptanceSection,
    confirm: projectAcceptanceConfirm,
    message: projectAcceptanceMessage,
  }
};
