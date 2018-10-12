import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICustomerAllRequest,
  ICustomerByIdRequest,
  ICustomerListRequest,
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
} from '@lookup/classes/queries';
import {
  ICustomer,
  ICustomerDetail,
  ICustomerList,
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList
} from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;

  mileageExceptionGetAll: IQueryCollectionState<
  IMileageExceptionAllRequest,
  IMileageException
>;
mileageExceptionGetList: IQueryCollectionState<
  IMileageExceptionListRequest,
  IMileageExceptionList
>;
mileageExceptionGetById: IQuerySingleState<
  IMileageExceptionByIdRequest,
  IMileageExceptionDetail
>;
}
