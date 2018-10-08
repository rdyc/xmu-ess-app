import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest, ICurrencyAllRequest, ICurrencyByIdRequest, ICurrencyListRequest, ISystemLimitAllRequest, ISystemLimitByIdRequest, ISystemLimitListRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList,  ICurrency, ICurrencyDetail, ICurrencyList, ISystemLimit, ISystemLimitDetail, ISystemLimitList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  currencyGetAll: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
  currencyGetList: IQueryCollectionState<ICurrencyListRequest, ICurrencyList>;
  currencyGetById: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;
  systemLimitGetAll: IQueryCollectionState<ISystemLimitAllRequest, ISystemLimit>;
  systemLimitGetList: IQueryCollectionState<ISystemLimitListRequest, ISystemLimitList>;
  systemLimitGetById: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
}