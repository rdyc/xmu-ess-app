import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyAllRequest,
  ICurrencyByIdRequest,
  ICurrencyListRequest,
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
  IPositionGetAllRequest,
  IPositionGetByIdRequest,
  IPositionListRequest,
  IPositionPostRequest,
  IPositionPutRequest,
  ISystemLimitAllRequest,
  ISystemLimitByIdRequest,
  ISystemLimitListRequest,
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

import { ILookupCustomerDeleteRequest, ILookupCustomerPostRequest, ILookupCustomerPutRequest } from '../queries/customer';
import { IPositionDeleteRequest } from '../queries/position/IPositionDeleteRequest';

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
  positionPost: IQuerySingleState<IPositionPostRequest, IPosition>;
  positionPut: IQuerySingleState<IPositionPutRequest, IPosition>;
  positionDelete: IQuerySingleState<IPositionDeleteRequest, boolean>;

  currencyGetAll: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
  currencyGetList: IQueryCollectionState<ICurrencyListRequest, ICurrencyList>;
  currencyGetById: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;

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
}
