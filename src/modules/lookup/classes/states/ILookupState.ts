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
  IMenuGetAllRequest,
  IMenuGetByIdRequest,
  IMenuListRequest,
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IPositionGetAllRequest,
  IPositionGetByIdRequest,
  IPositionListRequest,
  IRoleAllRequest,
  IRoleByIdRequest,
  IRoleListRequest,
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
  IMenu,
  IMenuDetail,
  IMenuList,
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList,
  IPosition,
  IPositionDetail,
  IPositionList,
  IRole,
  IRoleDetail,
  IRoleList,
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

  menuGetAll: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
  menuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  menuGetById: IQuerySingleState<IMenuGetByIdRequest, IMenuDetail>;

  positionGetAll: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
  positionGetList: IQueryCollectionState<IPositionListRequest, IPositionList>;
  positionGetById: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
}
