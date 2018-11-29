import { roleConfirm, roleField, roleFieldHelperFor, roleMessage, rolePage, roleSection } from './lookupRoleMessage';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },
  role: {
    page: rolePage,
    field: roleField,
    fieldFor: roleFieldHelperFor,
    section: roleSection,
    confirm: roleConfirm,
    message: roleMessage
  }
};