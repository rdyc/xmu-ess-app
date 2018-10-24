import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICompanyAllRequest,
  ICompanyByIdRequest,
  ICompanyListRequest,
  ICurrencyAllRequest,
  ICurrencyByIdRequest,
  ICurrencyListRequest,
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
  ILookupCustomerGetAllRequest,
  ILookupCustomerGetDetailRequest,
  ILookupCustomerGetListRequest,
  ILookupMileageExceptionAllRequest,
  ILookupMileageExceptionByIdRequest,
  ILookupMileageExceptionListRequest,
  IMenuGetAllRequest,
  IMenuGetByIdRequest,
  IMenuListRequest,
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

import { ILookupCustomerDeleteRequest, ILookupCustomerPostRequest, ILookupCustomerPutRequest } from '../queries/customer';

export interface ILookupState {
  lookupCustomerGetAll: IQueryCollectionState<ILookupCustomerGetAllRequest, ICustomer>;
  lookupCustomerGetList: IQueryCollectionState<ILookupCustomerGetListRequest, ICustomerList>;
  lookupCustomerGetById: IQuerySingleState<ILookupCustomerGetDetailRequest, ICustomerDetail>;
  lookupCustomerPost: IQuerySingleState<ILookupCustomerPostRequest, ICustomer>;
  lookupCustomerPut: IQuerySingleState<ILookupCustomerPutRequest, ICustomer>;
  lookupCustomerDelete: IQuerySingleState<ILookupCustomerDeleteRequest, boolean>;

  lookupMileageExceptionGetAll: IQueryCollectionState<ILookupMileageExceptionAllRequest, IMileageException>;
  lookupMileageExceptionGetList: IQueryCollectionState<ILookupMileageExceptionListRequest, IMileageExceptionList>;
  lookupMileageExceptionGetById: IQuerySingleState<ILookupMileageExceptionByIdRequest, IMileageExceptionDetail>;

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

  holidayGetAll: IQueryCollectionState<IHolidayAllRequest, IHoliday>;
  holidayGetList: IQueryCollectionState<IHolidayListRequest, IHolidayList>;
  holidayGetById: IQuerySingleState<IHolidayByIdRequest, IHolidayDetail>;

  leaveGetAll: IQueryCollectionState<ILeaveAllRequest, ILeave>;
  leaveGetList: IQueryCollectionState<ILeaveListRequest, ILeaveList>;
  leaveGetById: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
  leavePut: IQuerySingleState<ILeavePutRequest, ILeave>;

  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
}
