import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest, IMenuAllRequest, IMenuByIdRequest, IMenuListRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList, IMenu, IMenuDetail, IMenuList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  menuGetAll: IQueryCollectionState<IMenuAllRequest, IMenu>;
  menuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  menuGetById: IQuerySingleState<IMenuByIdRequest, IMenuDetail>;
}