import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest, IMenuByIdRequest, IMenuGetAllRequest, IMenuListRequest, IPositionByIdRequest, IPositionGetAllRequest, IPositionListRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList, IMenu, IMenuDetail, IMenuList, IPosition, IPositionDetail, IPositionList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  menuGetAll: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
  menuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  menuGetById: IQuerySingleState<IMenuByIdRequest, IMenuDetail>;
  positionGetAll: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
  positionGetList: IQueryCollectionState<IPositionListRequest, IPositionList>;
  positionGetById: IQuerySingleState<IPositionByIdRequest, IPositionDetail>;
}