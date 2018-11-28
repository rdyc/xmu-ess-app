import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyAllRequest,
  ICurrencyByIdRequest,
  ICurrencyListRequest,
  IDiemAllRequest,
  IDiemByIdRequest,
  IDiemListRequest,
  ILookupHolidayGetAllRequest,
  ILookupHolidayGetByIdRequest,
  ILookupHolidayGetListRequest,
  ILookupLeaveGetAllRequest,
  ILookupLeaveGetDetailRequest,
  ILookupLeaveGetListRequest,
  ILookupLeavePutRequest,
  IMenuGetAllRequest,
  IMenuGetByIdRequest,
  IMenuListRequest,
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IPositionGetAllRequest,
  IPositionGetByIdRequest,
  IPositionListRequest,
  ISystemLimitAllRequest,
  ISystemLimitByIdRequest,
  ISystemLimitListRequest,
} from '@lookup/classes/queries';
import { 
  ILookupCompanyAllRequest,
  ILookupCompanyByIdRequest,
  ILookupCompanyListRequest,
 } from '@lookup/classes/queries/company';
import { 
  ILookupCustomerGetAllRequest,
  ILookupCustomerGetDetailRequest,
  ILookupCustomerGetListRequest,
 } from '@lookup/classes/queries/customer';
import { 
  ILookupRoleAllRequest,
  ILookupRoleByIdRequest,
  ILookupRoleListRequest,
 } from '@lookup/classes/queries/role';
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
  ILookupHoliday,
  ILookupHolidayDetail,
  ILookupHolidayList,
  ILookupLeave,
  ILookupLeaveDetail,
  ILookupLeaveList,
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

  mileageExceptionGetAll: IQueryCollectionState<IMileageExceptionAllRequest, IMileageException>;
  mileageExceptionGetList: IQueryCollectionState<IMileageExceptionListRequest, IMileageExceptionList>;
  mileageExceptionGetById: IQuerySingleState<IMileageExceptionByIdRequest, IMileageExceptionDetail>;

  lookupRoleGetAll: IQueryCollectionState<ILookupRoleAllRequest, IRole>;
  lookupRoleGetList: IQueryCollectionState<ILookupRoleListRequest, IRoleList>;
  lookupRoleGetById: IQuerySingleState<ILookupRoleByIdRequest, IRoleDetail>;

  lookupCompanyGetAll: IQueryCollectionState<ILookupCompanyAllRequest, ICompany>;
  lookupCompanyGetList: IQueryCollectionState<ILookupCompanyListRequest, ICompanyList>;
  lookupCompanyGetById: IQuerySingleState<ILookupCompanyByIdRequest, ICompanyDetail>;

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

  lookupHolidayGetAll: IQueryCollectionState<ILookupHolidayGetAllRequest, ILookupHoliday>;
  lookupHolidayGetList: IQueryCollectionState<ILookupHolidayGetListRequest, ILookupHolidayList>;
  lookupHolidayGetById: IQuerySingleState<ILookupHolidayGetByIdRequest, ILookupHolidayDetail>;

  lookupLeaveGetAll: IQueryCollectionState<ILookupLeaveGetAllRequest, ILookupLeave>;
  lookupLeaveGetList: IQueryCollectionState<ILookupLeaveGetListRequest, ILookupLeaveList>;
  lookupLeaveGetById: IQuerySingleState<ILookupLeaveGetDetailRequest, ILookupLeaveDetail>;
  lookupLeavePut: IQuerySingleState<ILookupLeavePutRequest, ILookupLeave>;

  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
}
