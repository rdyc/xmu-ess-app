import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettlementApprovalGetAllRequest,
  ISettlementApprovalGetByIdRequest,
  ISettlementApprovalPostRequest,
} from '@purchase/classes/queries/settlementHistories';
import { ISettlement, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import {
  settlementApprovalGetAllDispose,
  settlementApprovalGetAllRequest,
  settlementApprovalGetByIdDispose,
  settlementApprovalGetByIdRequest,
  settlementApprovalPostDispose,
  settlementApprovalPostRequest,
} from '@purchase/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  settlementApprovalState: {
    all: IQueryCollectionState<ISettlementApprovalGetAllRequest, ISettlement>;
    detail: IQuerySingleState<ISettlementApprovalGetByIdRequest, ISettlementDetail>;
  };
}

interface PropsFromDispatch {
  settlementApprovalDispatch: {
    // command
    createRequest: typeof settlementApprovalPostRequest;
    createDispose: typeof settlementApprovalPostDispose;

    // query
    loadAllRequest: typeof settlementApprovalGetAllRequest;
    loadAllDispose: typeof settlementApprovalGetAllDispose;
    loadDetailRequest: typeof settlementApprovalGetByIdRequest;
    loadDetailDispose: typeof settlementApprovalGetByIdDispose;
  };
}

export interface WithSettlementApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ settlementApprovalGetAll, settlementApprovalGetById }: IAppState) => ({
  settlementApprovalState: {
    all: settlementApprovalGetAll,
    detail: settlementApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  settlementApprovalDispatch: {
    // command
    createRequest: (request: ISettlementApprovalPostRequest) => dispatch(settlementApprovalPostRequest(request)),
    createDispose: () => dispatch(settlementApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: ISettlementApprovalGetAllRequest) => dispatch(settlementApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(settlementApprovalGetAllDispose()),
    loadDetailRequest: (request: ISettlementApprovalGetByIdRequest) => dispatch(settlementApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(settlementApprovalGetByIdDispose()),
  }
});

export const withSettlementApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);