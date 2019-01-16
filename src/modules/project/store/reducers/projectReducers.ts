import projectAcceptanceReducers from './acceptance/projectAcceptanceReducers';
import projectApprovalReducers from './approval/projectApprovalReducers';
import projectAssignmentReducers from './assignment/projectAssignmentReducers';
import projectHourReducers from './hour/projectHourReducers';
import projectOwnerReducers from './owner/projectOwnerReducers';
import projectRegistrationReducers from './registration/projectRegistrationReducers';
import projectSiteReducers from './site/projectSiteReducers';
import projectStatusReducers from './status/projectStatusReducers';

export const projectReducers = {
  ...projectRegistrationReducers,
  ...projectOwnerReducers,
  ...projectHourReducers,
  ...projectStatusReducers,
  ...projectSiteReducers,
  ...projectApprovalReducers,
  ...projectAssignmentReducers,
  ...projectAcceptanceReducers,
};