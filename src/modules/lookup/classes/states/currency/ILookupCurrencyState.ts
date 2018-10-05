import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ICurrencyAllRequest, ICurrencyByIdRequest, ICurrencyListRequest } from '@lookup/classes/queries';
import { ICurrency, ICurrencyList } from '@lookup/classes/response';

export interface ILookupState {
  customerGetAll: IQueryCollectionState<ICurrencyAllRequest, ICurrency>;
  customerGetList: IQueryCollectionState<ICurrencyListRequest, ICurrencyList>;
  customerGetById: IQuerySingleState<ICurrencyByIdRequest, ICurrency>;
}