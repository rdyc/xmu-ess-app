import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ICustomerAllRequest, 
  ICustomerByIdRequest, 
  ICustomerListRequest, 
  
  IMenuGetAllRequest, 
  IMenuGetByIdRequest, 
  IMenuListRequest, 
  
  IPositionGetAllRequest, 
  IPositionGetByIdRequest, 
  IPositionListRequest, 
  IPositionPostRequest, 
  IPositionPutRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList, IMenu, IMenuDetail, IMenuList, IPosition, IPositionDetail, IPositionList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  menuGetAll: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
  menuGetList: IQueryCollectionState<IMenuListRequest, IMenuList>;
  menuGetById: IQuerySingleState<IMenuGetByIdRequest, IMenuDetail>;
  positionGetAll: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
  positionGetList: IQueryCollectionState<IPositionListRequest, IPositionList>;
  positionGetById: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
  positionPost: IQuerySingleState<IPositionPostRequest, IPosition>;
  positionPut: IQuerySingleState<IPositionPutRequest, IPosition>;
}