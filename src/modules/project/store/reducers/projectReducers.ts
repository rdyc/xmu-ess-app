import projectOwnerReducers from './owner/projectOwnerReducers';
import projectRegistrationReducers from './registration/projectRegistrationReducers';

export const projectReducers = {
  ...projectRegistrationReducers,
  ...projectOwnerReducers
};