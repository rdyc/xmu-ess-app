import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ICurrencyDeleteRequest,
  ICurrencyGetAllRequest,
  ICurrencyGetByIdRequest,
  ICurrencyGetListRequest,
  ICurrencyPostRequest,
  ICurrencyPutRequest,
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
    all: IQueryCollectionState<ICurrencyGetAllRequest, ICurrency>;
    list: IQueryCollectionState<ICurrencyGetListRequest, ICurrencyList>;
    detail: IQuerySingleState<ICurrencyGetByIdRequest, ICurrencyDetail>;
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
    createRequest: (request: ICurrencyPostRequest) => dispatch(lookupCurrencyPostRequest(request)),
    createDispose: () => dispatch(lookupCurrencyPostDispose()),
    updateRequest: (request: ICurrencyPutRequest) => dispatch(lookupCurrencyPutRequest(request)),
    updateDispose: () => dispatch(lookupCurrencyPutDispose()),
    deleteRequest: (request: ICurrencyDeleteRequest) => dispatch(lookupCurrencyDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupCurrencyDeleteDispose()),
    
    // query
    loadAllRequest: (request: ICurrencyGetAllRequest) => dispatch(lookupCurrencyGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupCurrencyGetAllDispose()),
    loadListRequest: (request: ICurrencyGetListRequest) => dispatch(lookupCurrencyGetListRequest(request)),
    loadListDispose: () => dispatch(lookupCurrencyGetListDispose()),
    loadDetailRequest: (request: ICurrencyGetByIdRequest) => dispatch(lookupCurrencyGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupCurrencyGetByIdDispose()),
  }
});

export const withLookupCurrency = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);