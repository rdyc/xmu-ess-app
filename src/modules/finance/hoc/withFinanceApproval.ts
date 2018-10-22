import {
  IFinanceApprovalBulkPostRequest,
  IFinanceApprovalGetAllRequest,
  IFinanceApprovalGetByIdRequest,
  IFinanceApprovalPostRequest,
} from '@finance/classes/queries/approval';
import { IFinance, IFinanceDetail } from '@finance/classes/response';
import {
  financeApprovalBulkPostDispose,
  financeApprovalBulkPostRequest,
  financeApprovalGetAllDispose,
  financeApprovalGetAllRequest,
  financeApprovalGetByIdDispose,
  financeApprovalGetByIdRequest,
  financeApprovalPostDispose,
  financeApprovalPostRequest,
} from '@finance/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  financeApprovalState: {
    all: IQueryCollectionState<IFinanceApprovalGetAllRequest, IFinance>;
    detail: IQuerySingleState<IFinanceApprovalGetByIdRequest, IFinanceDetail>;
  };
}

interface PropsFromDispatch {
  financeApprovalDispatch: {
    // command
    createRequest: typeof financeApprovalPostRequest;
    createDispose: typeof financeApprovalPostDispose;
    updateRequest: typeof financeApprovalBulkPostRequest;
    updateDispose: typeof financeApprovalBulkPostDispose;

    // query
    loadAllRequest: typeof financeApprovalGetAllRequest;
    loadAllDispose: typeof financeApprovalGetAllDispose;
    loadDetailRequest: typeof financeApprovalGetByIdRequest;
    loadDetailDispose: typeof financeApprovalGetByIdDispose;
  };
}

export interface WithFinanceApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ financeApprovalGetAll, financeApprovalGetById }: IAppState) => ({
  financeApprovalState: {
    all: financeApprovalGetAll,
    detail: financeApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  financeApprovalDispatch: {
    // command
    createRequest: (request: IFinanceApprovalPostRequest) => dispatch(financeApprovalPostRequest(request)),
    createDispose: () => dispatch(financeApprovalPostDispose()),
    updateRequest: (request: IFinanceApprovalBulkPostRequest) => dispatch(financeApprovalBulkPostRequest(request)),
    updateDispose: () => dispatch(financeApprovalBulkPostDispose()),
    
    // query
    loadAllRequest: (request: IFinanceApprovalGetAllRequest) => dispatch(financeApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(financeApprovalGetAllDispose()),
    loadDetailRequest: (request: IFinanceApprovalGetByIdRequest) => dispatch(financeApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(financeApprovalGetByIdDispose()),
  }
});

export const withFinanceApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);