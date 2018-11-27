import { currencyConfirm, currencyField, currencyPage } from './currency/currencyMessage';
import { mileageExceptionConfirm, mileageExceptionField, mileageExceptionPage } from './mileageException';

export const lookupMessage = {
  mileageException: {
    page: mileageExceptionPage,
    field: mileageExceptionField,
    confirm: mileageExceptionConfirm, 
  },
  currency: {
    page: currencyPage,
    field: currencyField,
    confirm: currencyConfirm,
  }

};