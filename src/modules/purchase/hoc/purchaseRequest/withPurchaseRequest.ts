import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPurchaseGetAllRequest,
  IPurchaseGetByIdRequest,
  IPurchasePostRequest,
  IPurchasePutRequest,
} from '@purchase/classes/queries/purchaseRequest';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import {
  purchaseGetAllDispose,
  purchaseGetAllRequest,
  purchaseGetByIdDispose,
  purchaseGetByIdRequest,
  purchasePostDispose,
  purchasePostRequest,
  purchasePutDispose,
  purchasePutRequest,
} from '@purchase/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  purchaseRequestState: {
    all: IQueryCollectionState<IPurchaseGetAllRequest, IPurchase>;
    detail: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
  };
}

interface PropsFromDispatch {
  purchaseRequestDispatch: {
    // command
    createRequest: typeof purchasePostRequest;
    createDispose: typeof purchasePostDispose;
    updateRequest: typeof purchasePutRequest;
    updateDispose: typeof purchasePutDispose;

    // query
    loadAllRequest: typeof purchaseGetAllRequest;
    loadAllDispose: typeof purchaseGetAllDispose;
    loadDetailRequest: typeof purchaseGetByIdRequest;
    loadDetailDispose: typeof purchaseGetByIdDispose;
  };
}

export interface WithPurchaseRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ purchaseGetAll, purchaseGetById }: IAppState) => ({
  purchaseRequestState: {
    all: purchaseGetAll,
    detail: purchaseGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  purchaseRequestDispatch: {
    // command
    createRequest: (request: IPurchasePostRequest) => dispatch(purchasePostRequest(request)),
    createDispose: () => dispatch(purchasePostDispose()),
    updateRequest: (request: IPurchasePutRequest) => dispatch(purchasePutRequest(request)),
    updateDispose: () => dispatch(purchasePutDispose()),
    
    // query
    loadAllRequest: (request: IPurchaseGetAllRequest) => dispatch(purchaseGetAllRequest(request)),
    loadAllDispose: () => dispatch(purchaseGetAllDispose()),
    loadDetailRequest: (request: IPurchaseGetByIdRequest) => dispatch(purchaseGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(purchaseGetByIdDispose()),
  }
});

export const withPurchaseRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);