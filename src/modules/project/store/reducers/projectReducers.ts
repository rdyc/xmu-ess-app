import projectOwnerReducers from './owner/projectOwnerReducers';
import projectRegistrationReducers from './registration/projectRegistrationReducers';
import projectStatusReducers from './status/projectStatusReducers';

export const projectReducers = {
  ...projectRegistrationReducers,
  ...projectOwnerReducers,
  ...projectStatusReducers
};