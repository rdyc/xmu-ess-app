import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICompanyAllRequest,
  ICompanyByIdRequest,
  ICompanyListRequest,
  ICustomerAllRequest,
  ICustomerByIdRequest,
  ICustomerListRequest,
  IDiemAllRequest,
  IDiemByIdRequest,
  IDiemListRequest,
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IRoleAllRequest,
  IRoleByIdRequest,
  IRoleListRequest
} from '@lookup/classes/queries';
import {
  ICompany,
  ICompanyDetail,
  ICompanyList,
  ICustomer,
  ICustomerDetail,
  ICustomerList,
  IDiem,
  IDiemDetail,
  IDiemList,
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList,
  IRole,
  IRoleDetail,
  IRoleList
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

  roleGetAll: IQueryCollectionState<IRoleAllRequest, IRole>;
  roleGetList: IQueryCollectionState<IRoleListRequest, IRoleList>;
  roleGetById: IQuerySingleState<IRoleByIdRequest, IRoleDetail>;

  companyGetAll: IQueryCollectionState<ICompanyAllRequest, ICompany>;
  companyGetList: IQueryCollectionState<ICompanyListRequest, ICompanyList>;
  companyGetById: IQuerySingleState<ICompanyByIdRequest, ICompanyDetail>;
  
  diemGetAll: IQueryCollectionState<IDiemAllRequest, IDiem>;
  diemGetList: IQueryCollectionState<IDiemListRequest, IDiemList>;
  diemGetById: IQuerySingleState<IDiemByIdRequest, IDiemDetail>;
}
