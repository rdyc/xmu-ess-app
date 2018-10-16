import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICompanyAllRequest,
  ICompanyByIdRequest,
  ICompanyListRequest,
  ICurrencyAllRequest,
  ICurrencyByIdRequest,
  ICurrencyListRequest,
  ICustomerAllRequest,
  ICustomerByIdRequest,
  ICustomerListRequest,
  IDiemAllRequest,
  IDiemByIdRequest,
  IDiemListRequest,
  IHolidayAllRequest,
  IHolidayByIdRequest,
  IHolidayListRequest,
  ILeaveAllRequest,
  ILeaveByIdRequest,
  ILeaveListRequest,
  ILeavePutRequest,
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
  ISystemLimitAllRequest,
  ISystemLimitByIdRequest,
  ISystemLimitListRequest,
} from '@lookup/classes/queries';
import {
  ICompany,
  ICompanyDetail,
  ICompanyList,
  ICurrency,
  ICurrencyDetail,
  ICurrencyList,
  ICustomer,
  ICustomerDetail,
  ICustomerList,
  IDiem,
  IDiemDetail,
  IDiemList,
  IHoliday,
  IHolidayDetail,
  IHolidayList,
  ILeave,
  ILeaveDetail,
  ILeaveList,
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
  ISystemLimit,
  ISystemLimitDetail,
  ISystemLimitList,
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

  currencyGetAll: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
  currencyGetList: IQueryCollectionState<ICurrencyListRequest, ICurrencyList>;
  currencyGetById: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;

  systemLimitGetAll: IQueryCollectionState<
    ISystemLimitAllRequest,
    ISystemLimit
  >;
  systemLimitGetList: IQueryCollectionState<
    ISystemLimitListRequest,
    ISystemLimitList
  >;
  systemLimitGetById: IQuerySingleState<
    ISystemLimitByIdRequest,
    ISystemLimitDetail
  >;

  holidayGetAll: IQueryCollectionState<IHolidayAllRequest, IHoliday>;
  holidayGetList: IQueryCollectionState<IHolidayListRequest, IHolidayList>;
  holidayGetById: IQuerySingleState<IHolidayByIdRequest, IHolidayDetail>;

  leaveGetAll: IQueryCollectionState<ILeaveAllRequest, ILeave>;
  leaveGetList: IQueryCollectionState<ILeaveListRequest, ILeaveList>;
  leaveGetById: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
  leavePut: IQuerySingleState<ILeavePutRequest, ILeave>;
}
