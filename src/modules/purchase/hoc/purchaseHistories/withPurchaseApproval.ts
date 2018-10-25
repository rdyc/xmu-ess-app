import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPurchaseApprovalGetAllRequest,
  IPurchaseApprovalGetByIdRequest,
  IPurchaseApprovalPostRequest,
} from '@purchase/classes/queries/purchaseHistories';
import { IPurchase, IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import {
  purchaseApprovalGetAllDispose,
  purchaseApprovalGetAllRequest,
  purchaseApprovalGetByIdDispose,
  purchaseApprovalGetByIdRequest,
  purchaseApprovalPostDispose,
  purchaseApprovalPostRequest,
} from '@purchase/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  purchaseApprovalState: {
    all: IQueryCollectionState<IPurchaseApprovalGetAllRequest, IPurchase>;
    detail: IQuerySingleState<IPurchaseApprovalGetByIdRequest, IPurchaseDetail>;
  };
}

interface PropsFromDispatch {
  purchaseApprovalDispatch: {
    // command
    createRequest: typeof purchaseApprovalPostRequest;
    createDispose: typeof purchaseApprovalPostDispose;

    // query
    loadAllRequest: typeof purchaseApprovalGetAllRequest;
    loadAllDispose: typeof purchaseApprovalGetAllDispose;
    loadDetailRequest: typeof purchaseApprovalGetByIdRequest;
    loadDetailDispose: typeof purchaseApprovalGetByIdDispose;
  };
}

export interface WithPurchaseApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ purchaseApprovalGetAll, purchaseApprovalGetById }: IAppState) => ({
  purchaseApprovalState: {
    all: purchaseApprovalGetAll,
    detail: purchaseApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  purchaseApprovalDispatch: {
    // command
    createRequest: (request: IPurchaseApprovalPostRequest) => dispatch(purchaseApprovalPostRequest(request)),
    createDispose: () => dispatch(purchaseApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: IPurchaseApprovalGetAllRequest) => dispatch(purchaseApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(purchaseApprovalGetAllDispose()),
    loadDetailRequest: (request: IPurchaseApprovalGetByIdRequest) => dispatch(purchaseApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(purchaseApprovalGetByIdDispose()),
  }
});

export const withPurchaseApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);