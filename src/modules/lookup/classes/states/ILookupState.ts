import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyGetAllRequest,
  ICurrencyGetByIdRequest,
  ICurrencyGetListRequest,
  IDiemAllRequest,
  IDiemByIdRequest,
  IDiemListRequest,
  IHolidayAllRequest,
  IHolidayByIdRequest,
  IHolidayListRequest,
  ILeaveGetAllRequest,
  ILeaveGetDetailRequest,
  ILeaveGetListRequest,
  ILeavePutRequest,
  IMenuGetAllRequest,
  IMenuGetByIdRequest,
  IMenuListRequest,
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IMileageExceptionPostRequest,
  IMileageExceptionPutRequest,
  IPositionGetAllRequest,
  IPositionGetByIdRequest,
  IPositionListRequest,
  ISystemLimitAllRequest,
  ISystemLimitByIdRequest,
  ISystemLimitDeleteRequest,
  ISystemLimitListRequest,
  ISystemLimitPostRequest,
  ISystemLimitPutRequest,
} from '@lookup/classes/queries';
import {
  ILookupCompanyDeleteRequest,
  ILookupCompanyGetAllRequest,
  ILookupCompanyGetDetailRequest,
  ILookupCompanyGetListRequest,
  ILookupCompanyPostRequest,
  ILookupCompanyPutRequest,
} from '@lookup/classes/queries/company';
import {
  ILookupCustomerGetAllRequest,
  ILookupCustomerGetDetailRequest,
  ILookupCustomerGetListRequest,
 } from '@lookup/classes/queries/customer';
import { 
  ILookupRoleDeleteRequest,
  ILookupRoleGetAllRequest,
  ILookupRoleGetDetailRequest,
  ILookupRoleGetListRequest,
  ILookupRolePostRequest,
  ILookupRolePutRequest,
 } from '@lookup/classes/queries/role';
import {
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
import {
  ICompany,
  ICompanyDetail,
  ICompanyList
} from '@lookup/classes/response/company';

import { 
  // ICurrencyDeleteRequest,
  ICurrencyPostRequest, ICurrencyPutRequest } from '../queries/currency';
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
  mileageExceptionPost: IQuerySingleState<IMileageExceptionPostRequest, IMileageException>;
  mileageExceptionPut: IQuerySingleState<IMileageExceptionPutRequest, IMileageException>;

  lookupRoleGetAll: IQueryCollectionState<ILookupRoleGetAllRequest, IRole>;
  lookupRoleGetList: IQueryCollectionState<ILookupRoleGetListRequest, IRoleList>;
  lookupRoleGetById: IQuerySingleState<ILookupRoleGetDetailRequest, IRoleDetail>;
  lookupRolePost: IQuerySingleState<ILookupRolePostRequest, IRole>;
  lookupRolePut: IQuerySingleState<ILookupRolePutRequest, IRole>;
  lookupRoleDelete: IQuerySingleState<ILookupRoleDeleteRequest, boolean>;

  lookupCompanyGetAll: IQueryCollectionState<ILookupCompanyGetAllRequest, ICompany>;
  lookupCompanyGetList: IQueryCollectionState<ILookupCompanyGetListRequest, ICompanyList>;
  lookupCompanyGetById: IQuerySingleState<ILookupCompanyGetDetailRequest, ICompanyDetail>;
  lookupCompanyPost: IQuerySingleState<ILookupCompanyPostRequest, ICompany>;
  lookupCompanyPut: IQuerySingleState<ILookupCompanyPutRequest, ICompany>;
  lookupCompanyDelete: IQuerySingleState<ILookupCompanyDeleteRequest, boolean>;

  diemGetAll: IQueryCollectionState<IDiemAllRequest, IDiem>;
  diemGetList: IQueryCollectionState<IDiemListRequest, IDiemList>;
  diemGetById: IQuerySingleState<IDiemByIdRequest, IDiemDetail>;

  menuGetAll: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
  menuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  menuGetById: IQuerySingleState<IMenuGetByIdRequest, IMenuDetail>;

  positionGetAll: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
  positionGetList: IQueryCollectionState<IPositionListRequest, IPositionList>;
  positionGetById: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;

  currencyGetAll: IQueryCollectionState<ICurrencyGetAllRequest, ICurrency>;
  currencyGetList: IQueryCollectionState<ICurrencyGetListRequest, ICurrencyList>;
  currencyGetById: IQuerySingleState<ICurrencyGetByIdRequest, ICurrencyDetail>;
  currencyPost: IQuerySingleState<ICurrencyPostRequest, ICurrency>;
  currencyPut: IQuerySingleState<ICurrencyPutRequest, ICurrency>;
  // currencyDelete: IQuerySingleState<ICurrencyDeleteRequest, boolean>;

  holidayGetAll: IQueryCollectionState<IHolidayAllRequest, IHoliday>;
  holidayGetList: IQueryCollectionState<IHolidayListRequest, IHolidayList>;
  holidayGetById: IQuerySingleState<IHolidayByIdRequest, IHolidayDetail>;

  leaveGetAll: IQueryCollectionState<ILeaveGetAllRequest, ILeave>;
  leaveGetList: IQueryCollectionState<ILeaveGetListRequest, ILeaveList>;
  leaveGetById: IQuerySingleState<ILeaveGetDetailRequest, ILeaveDetail>;
  leavePut: IQuerySingleState<ILeavePutRequest, ILeave>;

  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
  systemLimitPost: IQuerySingleState<ISystemLimitPostRequest, ISystemLimit>;
  systemLimitPut: IQuerySingleState<ISystemLimitPutRequest, ISystemLimit>;
  systemLimitDelete: IQuerySingleState<ISystemLimitDeleteRequest, ISystemLimit>;
}
