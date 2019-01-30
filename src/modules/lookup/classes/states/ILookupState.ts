import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyGetAllRequest,
  ICurrencyGetByIdRequest,
  ICurrencyGetListRequest,
  ILeaveCalculationGetAllRequest,
  ILookupHolidayGetAllRequest,
  ILookupHolidayGetByIdRequest,
  ILookupHolidayGetListRequest,
  ILookupLeaveGetAllRequest,
  ILookupLeaveGetDetailRequest,
  ILookupLeaveGetListRequest,
  ILookupLeavePostRequest,
  ILookupLeavePutRequest,
  ILookupVersionGetByIdRequest,
  ILookupVersionPatchRequest,
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
  IPositionGetListRequest,
  IPositionPostRequest,
  IPositionPutRequest,
  ISystemLimitAllRequest,
  ISystemLimitAmountRequest,
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
  ILookupDiemAllRequest,
  ILookupDiemDeleteRequest,
  ILookupDiemDetailRequest,
  ILookupDiemListRequest,
  ILookupDiemPostRequest,
  ILookupDiemPutRequest,
} from '@lookup/classes/queries/diem';
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
  ILeaveCalculation,
  ILookupHoliday,
  ILookupHolidayDetail,
  ILookupHolidayList,
  ILookupLeave,
  ILookupLeaveDetail,
  ILookupLeaveList,
  ILookupVersion,
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
  ISystemLimitAmount,
  ISystemLimitDetail,
  ISystemLimitList,
} from '@lookup/classes/response';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response/company';

import { ICurrencyPostRequest, ICurrencyPutRequest } from '../queries/currency';
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

  lookupDiemGetAll: IQueryCollectionState<ILookupDiemAllRequest, IDiem>;
  lookupDiemGetList: IQueryCollectionState<ILookupDiemListRequest, IDiemList>;
  lookupDiemGetById: IQuerySingleState<ILookupDiemDetailRequest, IDiemDetail>;
  lookupDiemPost: IQuerySingleState<ILookupDiemPostRequest, IDiem>;
  lookupDiemPut: IQuerySingleState<ILookupDiemPutRequest, IDiem>;
  lookupDiemDelete: IQuerySingleState<ILookupDiemDeleteRequest, boolean>;

  lookupMenuGetAll: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
  lookupMenuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  lookupMenuGetById: IQuerySingleState<IMenuGetByIdRequest, IMenuDetail>;

  positionGetAll: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
  positionGetList: IQueryCollectionState<IPositionGetListRequest, IPositionList>;
  positionGetById: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
  positionPost: IQuerySingleState<IPositionPostRequest, IPosition>;
  positionPut: IQuerySingleState<IPositionPutRequest, IPosition>;
  positionDelete: IQuerySingleState<IPositionDeleteRequest, boolean>;

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

  leaveCalculationGetAll: IQueryCollectionState<ILeaveCalculationGetAllRequest, ILeaveCalculation>;

  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetAmount: IQuerySingleState<ISystemLimitAmountRequest, ISystemLimitAmount>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
  systemLimitPost: IQuerySingleState<ISystemLimitPostRequest, ISystemLimit>;
  systemLimitPut: IQuerySingleState<ISystemLimitPutRequest, ISystemLimit>;
  systemLimitDelete: IQuerySingleState<ISystemLimitDeleteRequest, boolean>;

  lookupVersionGetById: IQuerySingleState<ILookupVersionGetByIdRequest, ILookupVersion>;
  lookupVersionPatch: IQuerySingleState<ILookupVersionPatchRequest, ILookupVersion>;
}
