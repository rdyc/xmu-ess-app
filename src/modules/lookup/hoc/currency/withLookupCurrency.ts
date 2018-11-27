import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILookupCurrencyDeleteRequest,
  ILookupCurrencyGetAllRequest,
  ILookupCurrencyGetDetailRequest,
  ILookupCurrencyGetListRequest,
  ILookupCurrencyPostRequest,
  ILookupCurrencyPutRequest,
} from '@lookup/classes/queries/currency';
import { ICurrency, ICurrencyDetail, ICurrencyList } from '@lookup/classes/response';
import {
  lookupCurrencyDeleteDispose,
  lookupCurrencyDeleteRequest,
  lookupCurrencyGetAllDispose,
  lookupCurrencyGetAllRequest,
  lookupCurrencyGetByIdDispose,
  lookupCurrencyGetByIdRequest,
  lookupCurrencyGetListDispose,
  lookupCurrencyGetListRequest,
  lookupCurrencyPostDispose,
  lookupCurrencyPostRequest,
  lookupCurrencyPutDispose,
  lookupCurrencyPutRequest,
} from '@lookup/store/actions/';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupCurrencyState: {
    all: IQueryCollectionState<ILookupCurrencyGetAllRequest, ICurrency>;
    list: IQueryCollectionState<ILookupCurrencyGetListRequest, ICurrencyList>;
    detail: IQuerySingleState<ILookupCurrencyGetDetailRequest, ICurrencyDetail>;
  };
}

interface PropsFromDispatch {
  lookupCurrencyDispatch: {
    // command
    createRequest: typeof lookupCurrencyPostRequest;
    createDispose: typeof lookupCurrencyPostDispose;
    updateRequest: typeof lookupCurrencyPutRequest;
    updateDispose: typeof lookupCurrencyPutDispose;
    deleteRequest: typeof lookupCurrencyDeleteRequest;
    deleteDispose: typeof lookupCurrencyDeleteDispose;

    // query
    loadAllRequest: typeof lookupCurrencyGetAllRequest;
    loadAllDispose: typeof lookupCurrencyGetAllDispose;
    loadListRequest: typeof lookupCurrencyGetListRequest;
    loadListDispose: typeof lookupCurrencyGetListDispose;
    loadDetailRequest: typeof lookupCurrencyGetByIdRequest;
    loadDetailDispose: typeof lookupCurrencyGetByIdDispose;
  };
}

export interface WithLookupCurrency extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ currencyGetAll, currencyGetList, currencyGetById }: IAppState) => ({
  lookupCurrencyState: {
    all: currencyGetAll,
    list: currencyGetList,
    detail: currencyGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupCurrencyDispatch: {
    // command
    createRequest: (request: ILookupCurrencyPostRequest) => dispatch(lookupCurrencyPostRequest(request)),
    createDispose: () => dispatch(lookupCurrencyPostDispose()),
    updateRequest: (request: ILookupCurrencyPutRequest) => dispatch(lookupCurrencyPutRequest(request)),
    updateDispose: () => dispatch(lookupCurrencyPutDispose()),
    deleteRequest: (request: ILookupCurrencyDeleteRequest) => dispatch(lookupCurrencyDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupCurrencyDeleteDispose()),
    
    // query
    loadAllRequest: (request: ILookupCurrencyGetAllRequest) => dispatch(lookupCurrencyGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupCurrencyGetAllDispose()),
    loadListRequest: (request: ILookupCurrencyGetListRequest) => dispatch(lookupCurrencyGetListRequest(request)),
    loadListDispose: () => dispatch(lookupCurrencyGetListDispose()),
    loadDetailRequest: (request: ILookupCurrencyGetDetailRequest) => dispatch(lookupCurrencyGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupCurrencyGetByIdDispose()),
  }
});

export const withLookupCurrency = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);