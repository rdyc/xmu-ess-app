import { companyConfirm, companyField, companyPage, companySection } from './lookupCompanyMessage';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },
  company: {
    page: companyPage,
    field: companyField,
    section: companySection,
    confirm: companyConfirm
  },
};