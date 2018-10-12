import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest,
         IHolidayAllRequest, IHolidayByIdRequest, IHolidayListRequest,
         ILeaveAllRequest, ILeaveByIdRequest, ILeaveListRequest, ILeavePutRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList, 
         IHoliday, IHolidayDetail, IHolidayList,
         ILeave, ILeaveDetail, ILeaveList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  holidayGetAll: IQueryCollectionState<IHolidayAllRequest, IHoliday>;
  holidayGetList: IQueryCollectionState<IHolidayListRequest, IHolidayList>;
  holidayGetById: IQuerySingleState<IHolidayByIdRequest, IHolidayDetail>;
  leaveGetAll: IQueryCollectionState<ILeaveAllRequest, ILeave>;
  leaveGetList: IQueryCollectionState<ILeaveListRequest, ILeaveList>;
  leaveGetById: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
  leavePut: IQuerySingleState<ILeavePutRequest, ILeave>;
}