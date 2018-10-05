import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest } from '@lookup/classes/queries';
import { ICurrencyAllRequest, ICurrencyByIdRequest, ICurrencyListRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/classes/response';
import { ICurrency, ICurrencyList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICustomerAllRequest, ICustomer>;
  customerGetList: IQueryCollectionState<ICustomerListRequest, ICustomerList>;
  customerGetById: IQuerySingleState<ICustomerByIdRequest, ICustomerDetail>;
  currencyGetAll: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
  currencyGetList: IQueryCollectionState<ICurrencyListRequest, ICurrencyList>;
  currencyGetById: IQuerySingleState<ICurrencyByIdRequest, ICurrency>;
}