import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICurrencyAllRequest, ICurrencyByIdRequest, ICurrencyListRequest, ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest, ISystemLimitAllRequest, ISystemLimitByIdRequest, ISystemLimitListRequest } from '@lookup/classes/queries';
import { ICurrency, ICurrencyDetail, ICurrencyList,  ICustomer, ICustomerDetail, ICustomerList, ISystemLimit, ISystemLimitDetail, ISystemLimitList } from '@lookup/classes/response';

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