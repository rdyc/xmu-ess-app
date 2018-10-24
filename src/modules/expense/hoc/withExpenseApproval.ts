import {
  IExpenseApprovalGetAllRequest,
  IExpenseApprovalGetByIdRequest,
  IExpenseApprovalPostRequest,
} from '@expense/classes/queries/approval';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import {
  expenseApprovalGetAllDispose,
  expenseApprovalGetAllRequest,
  expenseApprovalGetByIdDispose,
  expenseApprovalGetByIdRequest,
  expenseApprovalPostDispose,
  expenseApprovalPostRequest,
} from '@expense/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  expenseApprovalState: {
    all: IQueryCollectionState<IExpenseApprovalGetAllRequest, IExpense>;
    detail: IQuerySingleState<IExpenseApprovalGetByIdRequest, IExpenseDetail>;
  };
}

interface PropsFromDispatch {
  expenseApprovalDispatch: {
    // command
    createRequest: typeof expenseApprovalPostRequest;
    createDispose: typeof expenseApprovalPostDispose;

    // query
    loadAllRequest: typeof expenseApprovalGetAllRequest;
    loadAllDispose: typeof expenseApprovalGetAllDispose;
    loadDetailRequest: typeof expenseApprovalGetByIdRequest;
    loadDetailDispose: typeof expenseApprovalGetByIdDispose;
  };
}

export interface WithExpenseApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ expenseApprovalGetAll, expenseApprovalGetById }: IAppState) => ({
  expenseApprovalState: {
    all: expenseApprovalGetAll,
    detail: expenseApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  expenseApprovalDispatch: {
    // command
    createRequest: (request: IExpenseApprovalPostRequest) => dispatch(expenseApprovalPostRequest(request)),
    createDispose: () => dispatch(expenseApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: IExpenseApprovalGetAllRequest) => dispatch(expenseApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(expenseApprovalGetAllDispose()),
    loadDetailRequest: (request: IExpenseApprovalGetByIdRequest) => dispatch(expenseApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(expenseApprovalGetByIdDispose()),
  }
});

export const withExpenseApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);