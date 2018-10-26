import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettlementGetAllRequest,
  ISettlementGetByIdRequest,
  ISettlementPostRequest,
  ISettlementPutRequest,
} from '@purchase/classes/queries/purchaseSettlement';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import {
  settlementGetAllDispose,
  settlementGetAllRequest,
  settlementGetByIdDispose,
  settlementGetByIdRequest,
  settlementPostDispose,
  settlementPostRequest,
  settlementPutDispose,
  settlementPutRequest,
} from '@purchase/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  purchaseSettlementState: {
    all: IQueryCollectionState<ISettlementGetAllRequest, ISettlement>;
    detail: IQuerySingleState<ISettlementGetByIdRequest, ISettlementDetail>;
  };
}

interface PropsFromDispatch {
  purchaseSettlementDispatch: {
    // command
    createRequest: typeof settlementPostRequest;
    createDispose: typeof settlementPostDispose;
    updateRequest: typeof settlementPutRequest;
    updateDispose: typeof settlementPutDispose;

    // query
    loadAllRequest: typeof settlementGetAllRequest;
    loadAllDispose: typeof settlementGetAllDispose;
    loadDetailRequest: typeof settlementGetByIdRequest;
    loadDetailDispose: typeof settlementGetByIdDispose;
  };
}

export interface WithPurchaseSettlement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ settlementGetAll, settlementGetById }: IAppState) => ({
  purchaseSettlementState: {
    all: settlementGetAll,
    detail: settlementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  purchaseSettlementDispatch: {
    // command
    createRequest: (request: ISettlementPostRequest) => dispatch(settlementPostRequest(request)),
    createDispose: () => dispatch(settlementPostDispose()),
    updateRequest: (request: ISettlementPutRequest) => dispatch(settlementPutRequest(request)),
    updateDispose: () => dispatch(settlementPutDispose()),
    
    // query
    loadAllRequest: (request: ISettlementGetAllRequest) => dispatch(settlementGetAllRequest(request)),
    loadAllDispose: () => dispatch(settlementGetAllDispose()),
    loadDetailRequest: (request: ISettlementGetByIdRequest) => dispatch(settlementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(settlementGetByIdDispose()),
  }
});

export const withPurchaseSettlement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);