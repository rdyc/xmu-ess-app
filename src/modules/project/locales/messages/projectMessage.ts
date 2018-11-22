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
} from './projectAssignmentMessage';
import {
  projectRegistrationConfirm,
  projectRegistrationField,
  projectRegistrationFieldHelperFor,
  projectRegistrationMessage,
  projectRegistrationOption,
  projectRegistrationPage,
  projectRegistrationSection,
} from './projectRegistrationMessage';
import {
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
    confirm: projectRegistrationConfirm,
    section: projectRegistrationSection,
    field: projectRegistrationField,
    fieldFor: projectRegistrationFieldHelperFor,
    message: projectRegistrationMessage
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
    message: projectSiteMessage
  },
  assignment: {
    page: projectAssignmentPage,
    section: projectAssignmentSection,
    option: projectAssignmentOption,
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
