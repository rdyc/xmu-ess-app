import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyGetAllRequest,
  ICurrencyGetByIdRequest,
  ICurrencyGetListRequest,
  IDiemAllRequest,
  IDiemByIdRequest,
  IDiemListRequest,
  ILookupHolidayGetAllRequest,
  ILookupHolidayGetByIdRequest,
  ILookupHolidayGetListRequest,
  ILookupLeaveGetAllRequest,
  ILookupLeaveGetDetailRequest,
  ILookupLeaveGetListRequest,
  ILookupLeavePostRequest,
  ILookupLeavePutRequest,
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
  ILookupRoleAllRequest,
  ILookupRoleByIdRequest,
  ILookupRoleListRequest,
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

  lookupRoleGetAll: IQueryCollectionState<ILookupRoleAllRequest, IRole>;
  lookupRoleGetList: IQueryCollectionState<ILookupRoleListRequest, IRoleList>;
  lookupRoleGetById: IQuerySingleState<ILookupRoleByIdRequest, IRoleDetail>;

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

  lookupHolidayGetAll: IQueryCollectionState<ILookupHolidayGetAllRequest, ILookupHoliday>;
  lookupHolidayGetList: IQueryCollectionState<ILookupHolidayGetListRequest, ILookupHolidayList>;
  lookupHolidayGetById: IQuerySingleState<ILookupHolidayGetByIdRequest, ILookupHolidayDetail>;

  lookupLeaveGetAll: IQueryCollectionState<ILookupLeaveGetAllRequest, ILookupLeave>;
  lookupLeaveGetList: IQueryCollectionState<ILookupLeaveGetListRequest, ILookupLeaveList>;
  lookupLeaveGetById: IQuerySingleState<ILookupLeaveGetDetailRequest, ILookupLeaveDetail>;
  lookupLeavePost: IQuerySingleState<ILookupLeavePostRequest, ILookupLeave>;
  lookupLeavePut: IQuerySingleState<ILookupLeavePutRequest, ILookupLeave>;

  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
  systemLimitPost: IQuerySingleState<ISystemLimitPostRequest, ISystemLimit>;
  systemLimitPut: IQuerySingleState<ISystemLimitPutRequest, ISystemLimit>;
  systemLimitDelete: IQuerySingleState<ISystemLimitDeleteRequest, ISystemLimit>;
}
